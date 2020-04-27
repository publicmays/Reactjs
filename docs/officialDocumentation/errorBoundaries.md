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

## Where to Place Error Boundaries

* The granularity of error boundaries is up to you. You may wrap top-level route components to display a “Something went wrong” message to the user, just like server-side frameworks often handle crashes. 
* You may also wrap individual widgets in an error boundary to protect them from crashing the rest of the application.

## New Behavior for Uncaught Errors

* As of React 16, errors that were not caught by any error boundary will result in unmounting of the whole React component tree.
* In our experience it is worse to leave corrupted UI in place than to completely remove it. 
* For example, in a product like Messenger leaving the broken UI visible could lead to somebody sending a message to the wrong person. Similarly, it is worse for a payments app to display a wrong amount than to render nothing.

## How About try/catch?

* try / catch is great but it only works for imperative code:

```ts
try {
  showButton();
} catch (error) {
  // ...
}
```

* React components are **declarative** and specify _what_ should be rendered:

```ts
<Button />
```

* Error boundaries preserve the declarative nature of React, and behave as you would expect. 
* For example, even if an error occurs in a componentDidUpdate method caused by a setState somewhere deep in the tree, it will still correctly propagate to the closest error boundary.

## How About Event Handlers?

* Error boundaries do not catch errors inside event handlers.
* React doesn’t need error boundaries to recover from errors in event handlers. 
* Unlike the render method and lifecycle methods, the event handlers don’t happen during rendering. So if they throw, React still knows what to display on the screen.

* If you need to catch an error inside event handler, use the regular JavaScript `try / catch` statement:

```ts
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { error: null };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        try {
            // Do something that could throw
        } catch (error) {
            this.setState({ error });
        }
    }

    render() {
        if (this.state.error) {
            return <h1> Caught an error. </h1>;
        }
        return <button onClick={this.handleClick}>Click Me </button>
    }
}
```