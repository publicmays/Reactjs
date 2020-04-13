* [Basic Hooks](#basic-hooks)
    * [useState](#useState)
    * [useEffect](#useEffect)
    * [useContext](#useContext)

* [Additional Hooks](#additional-hooks)
    * [useReducer](#useReducer)
    * useCallback
    * useMemo
    * useRef
    * useImperativeHandle
    * useLayoutEffect
    * useDebugValue

# Basic Hooks

## `useState`

```ts
const [state, setState] = useState(initialState);
```

* Returns a stateful value, and a function to update it.
* During the initial render, the returned state (`state`) is the same as the value passed as the first argument (`initialState`).
* `setState` is used to update the state. It accepts a new state value and enqueues a re-render of the component.

```ts
setState(newState);
```

* During subsequent re-renders, the first value returned by `useState` will always be the most recent state after applying updates.

### Functional updates

```ts
function Counter({initialCount}) {
    count [count, setCount] = useState(initialCount);
    return (
        <>
            Count: {count}
            <button onClick={() => setCount(initalCount)}>Rest</button>
            <button onClick={() => setCount(prevCount => prevCount -1)}> - </button>
            <button{() => setCount(prevCount => prevCount+1)}> + </button>
        </>
    );
}
```

* **Functional Form:** ”+” and ”-” buttons because the updated value is based on the previous value
* **Normal Form:** “Reset” button uses the normal form, because it always sets the count back to the initial value.
* If your update function returns the exact same value as the current state, the subsequent rerender will be skipped completely.

> Note:
> Unlike the `setState` found in class components, 
> `useState` does not automatically merge update objects. 
> You can replicate this behavior by combining the function updater form with object spread syntax:

```ts
setState(prevState => {
    // Object.assign would also work
    return {...prevState, ...updatedValues};
});
```

> Another option is `useReducer`, which is more suited for managing state objects that contain multiple sub-values.

### Lazy initial state
* The `initialState` argument is the state used during the initial render. 
* It's disregarded in subsequent renders
* If the initial state is the result of an expensive computation, you may provide a function instead, which will be executed only on the initial render:

```ts
const [state, setState] = useState(() => {
    const initialState = someExpensiveComputation(props);
    return initialState;
});
```

### Bailing out of a state update

* If you update a State Hook to the same value as the current state, 
* React will bail out without rendering the children or firing effects. 
* (React uses the Object.is comparison algorithm.)

* Note that React may still need to render that specific component again before bailing out. 
* That shouldn’t be a concern because React won’t unnecessarily go “deeper” into the tree. 
* If you’re doing expensive calculations while rendering, you can optimize them with `useMemo`.

# `useEffect`

```ts
useEffect(didUpdate);
```

* Mutations, subscriptions, timers, logging, and other side effects are not allowed inside the main body of a function component (referred to as React’s render phase).
* Instead, use `useEffect`. 
* The function passed to useEffect will run after the render is committed to the screen. 
* Effects run after every completed render, but can choose to fire them only when certain values have changed.

### Cleaning up an effect

```ts
useEffect(() => {
    const subscription = props.source.subscribe();
    return () => {
        // Clean up the subscription
        subscription.unsubscribe();
    };
});
```

* The clean-up function runs before the component is removed from the UI to prevent memory leaks. 
* Additionally, if a component renders multiple times, the previous effect is cleaned up before executing the next effect. 
* Ex. above a new subscription is created on every update.

### Timing of effects

* A DOM mutation that is visible to the user must fire synchronously before the next paint so that the user does not perceive a visual inconsistency. 
* (The distinction is conceptually similar to passive versus active event listeners.) 
* For these types of effects, React provides one additional Hook called `useLayoutEffect`[#useLayoutEffect]. It has the same signature as useEffect, and only differs in when it is fired.

### Conditionally firing an effect

* We don’t need to create a new subscription on every update, only if the source prop has changed.

```ts
useEffect(
    () => {
        const subscription = props.source.subscribe();
        return () => {
            subscription.unsubscribe();
        };
    }, [props.source]);
```

> Note:
> If you want to run an effect and clean it up only once (on mount and unmount), you can pass an empty array (`[]`) as a second argument. This tells React that your effect doesn’t depend on any values from props or state, so it never needs to re-run.

* Every value referenced inside the effect function should also appear in the dependencies array. 

## `useContext`

```ts
const value = useContext(MyContext);
```

* Accepts a context object (the value returned from `React.createContext`) and returns the current context value for that context. 
* The current context value is determined by the value prop of the nearest `<MyContext.Provider>` above the calling component in the tree.
* When the nearest `<MyContext.Provider>` above the component updates, 
* this Hook will trigger a rerender with the latest context value passed to that MyContext provider.
* Even if an ancestor uses `React.memo` or `shouldComponentUpdate`, a rerender will still happen starting at the component itself using `useContext`.
* Don’t forget that the argument to useContext must be the _context object_ itself:
    * Correct: `useContext(MyContext)`
    * Incorrect: `useContext(MyContext.Consumer)`
    * Incorrect: `useContext(MyContext.Provider)`
* A component calling `useContext` will always re-render when the context value changes. 
* If re-rendering the component is expensive, you can optimize it by using `memoization`.

> Tip
> If you’re familiar with the context API before Hooks,
> `useContext(MyContext)` is equivalent to static `contextType = MyContext` in a class, or to `<MyContext.Consumer>`.
> `useContext(MyContext)` only lets you read the context and subscribe to its changes. 
> You still need a `<MyContext.Provider>` above in the tree to provide the value for this context.

### Putting it together with Context.Provider

```ts
const themes = {
    light: {
      foreground: "#000000",
      background: "#eeeeee"
    },
    dark: {
      foreground: "#ffffff",
      background: "#222222"
    }
};

const ThemeContext = React.createContext(themes.light);

function App() {
    return (
        <ThemeContext.Provider value ={themes.dark}>
            <Toolbar />
        </ThemContext.Provider>
    );
}

function Toolbar(props) {
    return(
        <div>
            <ThemedButton />
        </div>
    );
}

function ThemedButton() {
    const theme = useContext(ThemeContext);
    return(
        <button style={{ background: theme.background, color: theme.foreground }}>
            I am styled by theme context!
        </button>
    );
}
```

# Additional Hooks

## `useReducer`

```ts
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

* Accepts a reducer of type `(state, action) => newState)`
* returns the current `state` paired with a `dispatch` method
* `useReducer` is preferrable to `useState` when you have complex state logic
    * involves multiple sub-values or
    * when next `state` depends on previous one
    * optimizes performance that trigger deep updates b/c you can pass `dispatch` down instead of callbacks

* Ex. of `useState` rewritten to use a reducer:

```ts
const initialState = {count: 0};

function reducer(state, action) {
    switch(action.type) {
        case 'increment':
            return {count: state.count + 1};
        case 'decrement': 
            return {count: state.count -1};
        default:
            throw new Error();
    }
}

function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <>
        Count: {state.count}
        <button onClick={() => dispatch({type: 'decrement'})}>-</button>
        <button onClick={() => dispatch({type: 'increment'})}>+</button>
        </>
    );
}
```

### Specifying initial state

* Simple Option: pass initial state as second argument

```ts
const [state, dispatch] = useReducer(
    reducer,
    {count: initialCount}
);
```

### Lazy Initialization

* Create initial state lazily
* `init` function as 3rd argument
* initial state will be set to `init(initialArg)`
* extracts the logic for calculating the initial state outside the reducer
* helps for resetting the state in a later response to an action

```ts
function init(initialCount) {
    return {count: initialCount};
}

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return {count: state.count + 1};
        case 'decrement':
            return {count: state.count - 1};
        case 'reset':
            return init(action.payload);
        default:
            throw new Error();
    }
}

function Counter({initialCount}) {
    const [state, dispatch] = useReducer(reducer, initialCount, init);
    return (
        <>
            Count: {state.count}
            <button onClick={() => dispatch({type: 'reset', payload: initialCount})}>
                Reset
            </button>
            <button onClick={() => dispatch({type: 'decrement'})}>-</button>
            <button onClick={() => dispatch({type: 'increment'})}>+</button>
        </>
    );
}
```

### Bailing out of a dispatch

* If you return the same value from a Reducer Hook as the current state
    * React will bail out without rendering the children or firing effects
    * React uses `Object.is` comparison algorithm

> Note:
> React may still need to render that specific component again before bailing out.
> That shouldn't be a concern because React won't unnecessarily go "deeper" into the tree.
> If you're doing expensive calculations while rendering, you can optimize them with `useMemo`.