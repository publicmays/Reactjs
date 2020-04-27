# Error Boundaries

* Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed

> Note:

* Error boundaries do not catch errors for:
    * Event handlers
    * Asynchronous code (e.g. `setTimeout` or `requestAnimationFrame` callbacks)
    * Server side rendering
    * Errors thrown in the error boundary itself (rather than its children)

* A class component becomes an error boundary if it defines either (or both) of the lifecycle methods static
    * `getDerivedStateFromError()`
    * `componentDidCatch()` 

```ts
class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        logErrorToMyService(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1> Something went wrong. </h1>;
        }

        return this.props.children;
    }
}
```

* Then you can use it as a regular component:

```ts
<ErrorBoundary>
    <MyWidget />
</ErrorBoundary>
```

* Error boundaries work like a JavaScript catch {} block, but for components. 
* Only class components can be error boundaries. 
* In practice, most of the time you’ll want to declare an error boundary component once and use it throughout your application.
* Note that error boundaries only catch errors in the components below them in the tree. 
* An error boundary can’t catch an error within itself. 
* If an error boundary fails trying to render the error message, the error will propagate to the closest error boundary above it.
* This, too, is similar to how catch {} block works in JavaScript.

