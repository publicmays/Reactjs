# useCallback

## Use useCallback() hook carefully, if you have a control on you children components

- In React code reviews, I see a lot of unnecessary usage of the useCallback() hook. Common misconception is that you need to use it for any callback passed as a prop to a child component. However, not true: it's a perf optimization only for when child component is pure/memo'd.

- useCallback() hooks allows to keep references to created functions inside components, but it should be used only for callbacks are passed to optimized child components that rely on reference equality to prevent unnecessary renders (e.g. shouldComponentUpdate, React.memo()).

- By default all React components do not use any update blockers, so there is no sense to force use useCallback for every callback in your application:

* But, it makes sense to pass memoized callbacks to components that handle reference equality:

## Children are out of your control

- On the other hand, if you don't know what children component might be, it is worth to wrap your functions with useCallback() hook. The operation itself is cheap and can prevent unwanted perf issues.

- But if you don't "own" the child component, isn't it safer to memo it when you pass it on? If your function is new on each render, you might break some perf of your consumers. e.g. shouldComponentUpdate / useEffect
