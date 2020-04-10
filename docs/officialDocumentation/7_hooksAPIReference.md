* [Basic Hooks](#basic-hooks)
    * [useState](#useState)
    * [useEffect](#useEffect)
    * useContext

* Additional Hooks
    * useReducer
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