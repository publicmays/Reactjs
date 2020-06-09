# React Top-Level API

* React is the entry point to the React library. 
* If you load React from a `<script>` tag, these top-level APIs are available on the React global. 
* If you use ES6 with npm, you can write `import React from 'react'`. 
* If you use ES5 with npm, you can write `var React = require('react')`.

## Overview

### Components

* React components let you split the UI into independent, reusable pieces, and think about each piece in isolation. React components can be defined by subclassing React.Component or React.PureComponent.

* `React.Component`
* `React.PureComponent`

* React components can also be defined as functions which can be wrapped:

* `React.memo`

### Creating React Elements

* We recommend using JSX to describe what your UI should look like. Each JSX element is just syntactic sugar for calling `React.createElement()`. You will not typically invoke the following methods directly if you are using JSX.

* `createElement()`
* `createFactory()`


### Transforming Elements

* React provides several APIs for manipulating elements:

* `cloneElement()`
* `isValidElement()`
* `React.Children`


### Fragments

* React also provides a component for rendering multiple elements without a wrapper.

* `React.Fragment`


### Refs

* `React.createRef`
* `React.forwardRef`

### Suspense

* Suspense lets components “wait” for something before rendering. Today, Suspense only supports one use case: loading components dynamically with React.lazy. In the future, it will support other use cases like data fetching.

* `React.lazy`
* `React.Suspense`

### Hooks
* Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class. Hooks have a dedicated docs section and a separate API reference:

#### Basic Hooks

```ts
useState
useEffect
useContext
```

#### Additional Hooks

```ts
useReducer
useCallback
useMemo
useRef
useImperativeHandle
useLayoutEffect
useDebugValue
```

### Reference

#### React.Component

* `React.Component` is the base class for React components when they are defined using ES6 classes:

```ts
class Greeting extends React.Component {
    render() {
        return <h1>Hello, {this.props.name} </h1>;
    }
}
```

#### React.PureComponent

* `React.PureComponent` is similar to `React.Component`. 
* The difference between them is that `React.Component` doesn’t implement `shouldComponentUpdate()`, but 
* `React.PureComponent` implements it with a shallow prop and state comparison.

* If your React component’s `render()` function renders the same result given the same props and state, you can use React.PureComponent for a performance boost in some cases.

> Note

* `React.PureComponent’s` `shouldComponentUpdate()` only shallowly compares the objects. If these contain complex data structures, it may produce false-negatives for deeper differences. Only extend PureComponent when you expect to have simple props and state, or use `forceUpdate()` when you know deep data structures have changed. Or, consider using immutable objects to facilitate fast comparisons of nested data.

Furthermore, `React.PureComponent’s` `shouldComponentUpdate()` skips prop updates for the whole component subtree. Make sure all the children components are also “pure”.

#### React.memo

```ts
const MyComponent = React.memo(function MyComponent(props) {
    /* render using props */
});
```

* `React.memo` is a higher order component. It’s similar to React.PureComponent but for function components instead of classes.

* If your function component renders the same result given the same props, you can wrap it in a call to `React.memo` for a performance boost in some cases by memoizing the result. 

* This means that React will skip rendering the component, and reuse the last rendered result.

* `React.memo` only checks for prop changes. If your function component wrapped in React.memo has a useState or useContext Hook in its implementation, it will still rerender when state or context change.

* By default it will only shallowly compare complex objects in the props object. If you want control over the comparison, you can also provide a custom comparison function as the second argument.

```ts
function MyComponent(props) {
    /* render using props */
}

function areEqual(prevProps, nextProps) {
    /*
    return true if passing nextProps to render would return the same result as passing prevprops to render,
    otherwise return false
    */
}

export default React.memo(MyComponent, areEqual);
```

* This method only exists as a performance optimization. Do not rely on it to “prevent” a render, as this can lead to bugs.

> Note

* Unlike the `shouldComponentUpdate()` method on class components, the areEqual function returns true if the props are equal and false if the props are not equal. This is the inverse from shouldComponentUpdate.

#### createElement()

```ts
React.createElement(
    type,
    [props],
    [...children]
)
```

* Create and return a new React element of the given type. The type argument can be either a tag name string (such as 'div' or 'span'), a React component type (a class or a function), or a React fragment type.

#### cloneElement()

* Clone and return a new React element using element as the starting point. The resulting element will have the original element’s props with the new props merged in shallowly. New children will replace existing children. key and ref from the original element will be preserved.

* `React.cloneElement()` is almost equivalent to:

```ts
<element.type {...element.props} {...props}>
    {children}
</element.type>
```

* However, it also preserves refs. This means that if you get a child with a ref on it, you won’t accidentally steal it from your ancestor. You will get the same ref attached to your new element.

* This API was introduced as a replacement of the deprecated React.addons.cloneWithProps().

#### isValidElement()

```ts
React.isValidElement(object)
```

* Verifies the object is a React element. Returns true or false.

#### React.Children

* React.Children provides utilities for dealing with the `this.props.children` opaque data structure.

### React.Children.map

```ts
React.Chilren.map(children, function[(thisArg)])
```

* Invokes a function on every immediate child contained within children with this set to thisArg. If children is an array it will be traversed and the function will be called for each child in the array. If children is null or undefined, this method will return null or undefined rather than an array.

> Note

* If children is a Fragment it will be treated as a single child and not traversed.

### React.Children.forEach

```ts
React.Children.forEach(children, function[(thisArg)])
```