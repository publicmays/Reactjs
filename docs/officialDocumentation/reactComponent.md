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

* The `render()` method is the only required method in a class component.

* When called, it should examine `this.props` and `this.state` and return one of the following types:

* **React elements.** Typically created via JSX. For example, <div /> and <MyComponent /> are React elements that instruct React to render a DOM node, or another user-defined component, respectively.
* **Arrays and fragments.** Let you return multiple elements from render. See the documentation on fragments for more details.
* **Portals.** Let you render children into a different DOM subtree. See the documentation on portals for more details.
* **String and numbers.** These are rendered as text nodes in the DOM.
* **Booleans or null.** Render nothing. (Mostly exists to support return test && <Child /> pattern, where test is boolean.)

* The render() function should be pure, meaning that it does not modify component state, it returns the same result each time it’s invoked, and it does not directly interact with the browser.

* If you need to interact with the browser, perform your work in componentDidMount() or the other lifecycle methods instead. Keeping render() pure makes components easier to think about.

> Note:

* `render()` will not be invoked if `shouldComponentUpdate()` returns false.

#### constructor()

```ts
constructor(props)
```

* **If you don’t initialize state and you don’t bind methods, you don’t need to implement a constructor for your React component.**

* The constructor for a React component is called before it is mounted. When implementing the constructor for a React.Component subclass, you should call super(props) before any other statement. Otherwise, this.props will be undefined in the constructor, which can lead to bugs.

* Typically, in React constructors are only used for two purposes:

* Initializing local state by assigning an object to this.state.
* Binding event handler methods to an instance.
* You should not call `setState()` in the `constructor()`. Instead, if your component needs to use local state, assign the initial state to this.state directly in the constructor:

```ts
constructor(props) {
    super(props);
    // Do't call this.setState() here!
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
}
```

* Constructor is the only place where you should assign this.state directly. In all other methods, you need to use this.setState() instead.

* Avoid introducing any side-effects or subscriptions in the constructor. For those use cases, use componentDidMount() instead.

> Note:

Avoid copying props into state! This is a common mistake:

```ts
constructor(props) {
    super(props);
    // Don't do this!
    this.state = { color: props.color };
}
```

* The problem is that it’s both unnecessary (you can use `this.props.color` directly instead), and creates bugs (updates to the color prop won’t be reflected in the state).

* Only use this pattern if you intentionally want to ignore prop updates. In that case, it makes sense to rename the prop to be called initialColor or defaultColor. You can then force a component to “reset” its internal state by changing its key when necessary.

#### componentDidMount()

```ts
componentDidMount()
```

* `componentDidMount()` is invoked immediately after a component is mounted (inserted into the tree). Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request.

* This method is a good place to set up any subscriptions. If you do that, don’t forget to unsubscribe in componentWillUnmount().

* You may call `setState()` immediately in `componentDidMount()`. It will trigger an extra rendering, but it will happen before the browser updates the screen. This guarantees that even though the `render()` will be called twice in this case, the user won’t see the intermediate state. Use this pattern with caution because it often causes performance issues. In most cases, you should be able to assign the initial state in the `constructor()` instead. It can, however, be necessary for cases like modals and tooltips when you need to measure a DOM node before rendering something that depends on its size or position.

#### componentDidUpdate()

```ts
componentDidUpdate(prevProps, prevState, snapshot)
```

* `componentDidUpdate()` is invoked immediately after updating occurs. This method is not called for the initial render.

* Use this as an opportunity to operate on the DOM when the component has been updated. This is also a good place to do network requests as long as you compare the current props to previous props (e.g. a network request may not be necessary if the props have not changed).

```ts
componentDidUpdate(prevProps) {
    // Typical usage ( don't forget to compare props )
    if (this.props.userID !== prevProps.userID) {
        this.fetchData(this.props.userID);
    }
}
```

* You may call `setState()` immediately in `componentDidUpdate()` but note that it must be wrapped in a condition like in the example above, or you’ll cause an infinite loop. It would also cause an extra re-rendering which, while not visible to the user, can affect the component performance. If you’re trying to “mirror” some state to a prop coming from above, consider using the prop directly instead. 

> Note:

* `componentDidUpdate()` will not be invoked if `shouldComponentUpdate()` returns false.

#### componentWillUnmount()

```ts
componentWillUnmount()
```

* `componentWillUnmount()` is invoked immediately before a component is unmounted and destroyed. Perform any necessary cleanup in this method, such as invalidating timers, canceling network requests, or cleaning up any subscriptions that were created in `componentDidMount()`.

You should not call `setState()` in `componentWillUnmount()` because the component will never be re-rendered. Once a component instance is unmounted, it will never be mounted again.

### Error boundaries

* Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.

* A class component becomes an error boundary if it defines either (or both) of the lifecycle methods static getDerivedStateFromError() or componentDidCatch(). Updating state from these lifecycles lets you capture an unhandled JavaScript error in the below tree and display a fallback UI.

* Only use error boundaries for recovering from unexpected exceptions; don’t try to use them for control flow.

> Note:

* Error boundaries only catch errors in the components below them in the tree. An error boundary can’t catch an error within itself.

#### static getDerivedStateFromError()

```ts
static getDerivedStateFromError(error)
```

* This lifecycle is invoked after an error has been thrown by a descendant component. It receives the error that was thrown as a parameter and should return a value to update state.

```ts
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.</h1>
        }

        return this.props.children
    }
}
```

> Note:

* `getDerivedStateFromError()` is called during the “render” phase, so side-effects are not permitted. For those use cases, use `componentDidCatch()` instead.

#### componentDidCatch()