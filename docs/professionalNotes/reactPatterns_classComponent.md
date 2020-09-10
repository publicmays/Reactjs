# Class Component

Class Component - the component which extends React.Component and uses OOP paradigms to handle state, properties, actions and manage component lifecycle. React component re-renders if the parent component got re-rendered even if no props were changed.

## Regular Component - Plain props

```ts
export class ChildClassComponent extends Component<TValue> {
  render() {
    // if parent component updates this component will be re-rendered,
    // no matter if the props have been changed or not.
    return (
      <RenderCounter color="red">
        Child Class Component: {this.props.value}
      </RenderCounter>
    );
  }
}
```

## Solution 1: Override shouldComponentUpdate() lifecycle method

```ts
export class ChildClassComponentMemoized extends Component<TValue> {
  // ✅ place the logic to detect if component should update or not.
  shouldComponentUpdate(nextProps: Readonly<TValue>) {
    // 💡 the logic here might become very complicated,
    // make sure you split components to the small or
    // consider using Pure or Function components.
    return nextProps.value !== this.props.value;
  }

  // ✅ the component re-renders only if props have been changed.
  render() {
    return (
      <RenderCounter color="red">
        Child Class Component <strong>Memoized</strong>: {this.props.value}
      </RenderCounter>
    );
  }
}
```

## Solution 2: Use Pure Component

https://smykhailov.github.io/react-patterns/#/class-component
