# React.Component

## Overview

* React lets you define components as classes or functions. Components defined as classes currently provide more features which are described in detail on this page. To define a React component class, you need to extend React.Component:

```ts
class Welcome extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}</h1>;
    }
}
```

* The only method you must define in a React.Component subclass is called `render()`. All the other methods described on this page are optional.

* We strongly recommend against creating your own base component classes. In React components, code reuse is primarily achieved through composition rather than inheritance.

## The Component Lifecycle

* Each component has several “lifecycle methods” that you can override to run code at particular times in the process. In the list below, commonly used lifecycle methods are marked as bold. The rest of them exist for relatively rare use cases.

* [Diagram](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

### Mounting

* These methods are called in the following order when an instance of a component is being created and inserted into the DOM:

* **constructor()**
* static getDerivedStateFromProps()
* **render()**
* **componentDidMount()**

### Updating

* An update can be caused by changes to props or state. These methods are called in the following order when a component is being re-rendered:


* static getDerivedStateFromProps()
* shouldComponentUpdate()
* **render()**
* getSnapshotBeforeUpdate()
* **componentDidUpdate()**

### Unmounting

* This method is called when a component is being removed from the DOM:

* **componentWillUnmount()**

### Error Handling

* These methods are called when there is an error during rendering, in a lifecycle method, or in the constructor of any child component.

* static getDerivedStateFromError()
* componentDidCatch()

### Other APIs

* Each component also provides some other APIs:

* setState()
* forceUpdate()

### Class Properties
* defaultProps
* displayName

### Instance Properties
* props
* state

## Reference

### Commonly Used Lifecycle Methods

#### render()

```ts
render()
```