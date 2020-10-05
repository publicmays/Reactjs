# Context

This page covers only modern React Context API, i.e. `createContext()`.

## Context behavior

All consumers that are descendants of a Provider will re-render whenever the Provider’s value prop changes. The propagation from Provider to its descendant consumers (including .contextType on class components and useContext() hook) is not subject to the `shouldComponentUpdate()` method or `React.memo()`, so the consumer is updated even when an ancestor component skips an update.

```ts
// 💡 React.memo will ignored
const Example = React.memo((props) => {
  // 💣 Updates will be triggered inside
  const value = React.useContext(Context);

  return <div />;
});
```

> Examples and info is taken from the official ReactJS documentation.

https://smykhailov.github.io/react-patterns/#/context
