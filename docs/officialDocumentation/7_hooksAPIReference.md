# [Basic Hooks](#Basic-Hooks)

## [useState](#useState)
## useEffect
## useContext

# Additional Hooks

## useReducer
## useCallback
## useMemo
## useRef
## useImperativeHandle
## useLayoutEffect
## useDebugValue

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