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

Context uses reference identity to determine when to re-render, there are some gotchas that could trigger unintentional renders in consumers when a provider’s parent re-renders. For example, the code below will re-render all consumers every time the Provider re-renders because a new object is always created for value:

```ts
class Example extends React.Component {
  state = { value: 1 };
  render() {
    const { children } = this.props;

    // ⛔ ({ value: 1 } === { value: 1 }) is false, so reference is different
    return <Provider value={{ value: this.state.value }}>{children}</Provider>;
  }
}
```

To get around this, lift the value into the parent’s state:

```ts
class Example extends React.Component {
  state = { value: 1 };
  render() {
    const { children } = this.props;

    return <Provider value={this.state.value}>{children}</Provider>;
  }
}
```

> Note: if context value is constant, then having a static value is fine, no even need to use useMemo().

## Solution 1: Use memoized context value

If value is changing rarely is good option to memoize an object value with useMemo() hook.

```ts
const Example = (props) => {
  const { children, value } = props;
  // ✅ Now new `context` will be recreated only on `value` change
  const context = React.useMemo(() => ({ value }), [value]);

  return <Provider value={context}>{children}</Provider>;
};
```

## Solution 2: Use separate contexts

This trick was [described](https://kentcdodds.com/blog/how-to-use-react-context-effectively) by Kent Dodds. The idea is to pass plain/memoized values in separate contexts to avoid useless notifications to subscribers.

```ts
const Example = (props) => {
  const { children } = props;

  // ❗ both values are plain and safe for shallow compare
  const firstValue = 1;
  const secondValue = 2;

  return (
    <FirstProvider value={firstValue}>
      <SecondProvider value={secondValue}>{children}</SecondProvider>
    </FirstProvider>
  );
};
```

## Solution 3: Use context selectors

https://smykhailov.github.io/react-patterns/#/context
