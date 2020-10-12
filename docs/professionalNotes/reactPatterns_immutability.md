# State Immutability in React, why it is important, and how to achieve it using Immer

React props and state are readonly by contract; it is, however, very easy to break this contract and introduce issues that are difficult to debug. In order to prevent these issues it is advised not to mutate state unless necessary. If non-trivial mutation of the current state is unvoidable, it is advised to use an immutability helper called Immer.

In the text below we start with a piece of code that doesn't work, we transform it into code that works, but is error-prone and unreadable, and eventually we reach the state of well readable and easily maintainable code. As we go over these phases we gradually build a case for using Immer.

## State mutation outside of setState mechanism

React state is declared readonly, but that only means that the reference to it is constant. This effectively protects primitives from being changed, but it doesn't protect objects. The only sound means of state change in React is the setState method and any code that asserts it is correct in doing so. In the example below, the sumData function rightfully asserts that the state object will not change and based on that it caches its output based on the state object's internal field "data".

```ts
export const Component: React.FunctionComponent = (props) => {
  const [state, setState] = React.useState({ data: [0, 0] });

  // Assert state immutability
  const data = state.data;
  const sumData = React.useCallback(
    () => data.reduce((acc, val) => acc + val, 0),
    [data]
  );

  const run = () => {
    // State mutated.
    state.data = [1, 1];
    // Sum is out of sync.
    state.data.push(sumData());
    state.data.push(sumData());
    state.data.push(sumData());
    setState({ data: state.data });
  };
};
```

However, the run function changes the state object -- its internal field data now points to a different address. sumData captures the original address (that wasn't supposed to change), and therefore it will sum the original data.

The logical step in rectifying this seems to be to make sumData capture the entire state -- since it is readonly we will be sure that we always refer to the correct address. It also seemingly makes sense not to construct a new state object in run since we only change a single field inside of it:

```ts
export const Component: React.FunctionComponent = (props) => {
  const [state, setState] = React.useState({ data: [0, 0] });

  // Assert state immutability.
  const sumData = React.useCallback(
    () => state.data.reduce((acc, val) => acc + val, 0),
    [state]
  );

  const run = () => {
    // State mutated.
    state.data = [1, 1];
    // Sum is in sync.
    state.data.push(sumData());
    state.data.push(sumData());
    state.data.push(sumData());
    setState(state);
  };
};
```

The issue with this change is that now it doesn't work at all, because React asserts that since the address of the state object hasn't changed, the object itself hasn't changed, and it will ignore the setState call. The obvious solution is to copy the object:

```ts
export const Component: React.FunctionComponent = (props) => {
  const [state, setState] = React.useState({ data: [0, 0] });

  // Assert state immutability.
  const sumData = React.useCallback(
    () => state.data.reduce((acc, val) => acc + val, 0),
    [state]
  );

  const run = () => {
    // State mutated.
    state.data = [1, 1];
    // Contract violation.
    state.data.push(sumData());
    state.data.push(sumData());
    state.data.push(sumData());
    setState({ ...state });
  };
};
```

Now the code will work. The issue with this code, however, is that it is breaking the immutability contract with React and that it is prone to error. If the state object were to consist of multiple nested fields, we would have to make sure that the object is copied properly to form a new state. Since there is no native concept of "deep copy" in javascript, doing this can be rather cumbersome:

https://smykhailov.github.io/react-patterns/#/immutability
