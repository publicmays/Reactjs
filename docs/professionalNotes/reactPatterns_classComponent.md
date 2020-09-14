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

Consider using Pure Component.

```ts
export class ChildPureComponent extends PureComponent<TValue> {
  // `Pure` component implements `shouldComponentUpdate()` with a shallow prop and state comparison.
  // That means no additional changes needed for the plain props.
  // ✅ Component does not re-render if parent component re-renders
  // but the props have not been changed.
  render() {
    return (
      <RenderCounter color="green">
        Child Pure Component: {this.props.value}
      </RenderCounter>
    );
  }
}
```

## Regular Component - Object props

Passing objects as properties to the component are dangerous in terms of causing not wanted re-rendering. If component needs to work only with subset of the object properties and none of them being changed, the component still might re-render if any of the other property has changed.

Also, even if developer created the object and passes it as a parameter to the component, it doesn't prevent other developers to add their own properties to the same object without even knowing that it might have negative impact on re-rendering some other not related component.

```ts
export type TObjectProps = {
  obj: TObjectValue;
};

export type TObjectValue = {
  num: number;
  str: string;
};
```

The component takes object properties as defined above:

```ts
export class ChildClassComponentWithObjectProps extends Component<
  TObjectProps
> {
  render() {
    // The component only works with ✅ obj.str property and ignores ✅ obj.num
    // If parent component doesn't change the ✅ obj.str, but changes ⛔ obj.num
    // this component will still re-render 💣
    return (
      <RenderCounter color="red">
        Child Class Component: {this.props.obj.str}
      </RenderCounter>
    );
  }
}
```

When parent component changes obj.num and doesn't change obj.str, the component still re-renders. This will only be true if the actual instance changed, because PureComponent checks the instance itself.

## Solution 1: Use plain props

The best solution is to use plain props and pass primitive values to the component.

```ts
export class ChildClassComponentWithObjectProps extends Component<{str: string;}> {
  // ❗ even is you use plain props, make sule you also override shouldComponentUpdate()
  // othervise force update will trigger re-rendering.
  shouldComponentUpdate (nextProps: Readonly{str: string}) {
    return nextProps.str !== this.props.str;
  }
  render() {
    // ✅ No object which can impact re-rendering
    return (
      <RenderCounter color="red">
        Child Class Component: {this.props.str}
      </RenderCounter>
    );
  }
}
```

## Solution 2: Override shouldComponentUpdate() lifecycle method

When parent component changes obj.num and doesn't change obj.str, the component does not re-render.

```ts
export class ChildClassComponentWithObjectPropsMemoized extends Component<
  TObjectProps
>
{
  shouldComponentUpdate() {
    // ✅ Make sure you cover scenario, when other developer
    // could potentially add other fields to the props object
    return nextProps.obj.str !== this.props.obj.str;
  }

  render() {
    return (
      <RenderCounter color="red">
        Child Class Component <string>Memoized</strong>: {this.props.object.str}
      </RenderCounter>
    );
  }
}
```
