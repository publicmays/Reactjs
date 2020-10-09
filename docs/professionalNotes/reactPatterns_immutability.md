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

https://smykhailov.github.io/react-patterns/#/immutability
