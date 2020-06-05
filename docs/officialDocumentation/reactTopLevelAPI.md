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