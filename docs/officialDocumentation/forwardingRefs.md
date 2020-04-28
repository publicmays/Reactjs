# Forwarding Refs

* Ref forwarding is a technique for automatically passing a ref through a component to one of its children. 
* This is typically not necessary for most components in the application. 
* However, it can be useful for some kinds of components, especially in reusable component libraries.

## Forwarding Refs to DOM Components

```ts
function FancyButton(props) {
    return (
        <button className="FancyButton">
            {props.children}
        </button>
    );
}
```

* React components hide their implementation details, including their rendered output. 
* Other components using `FancyButton` usually will not need to obtain a ref to the inner button DOM element. 
* This is good because it prevents components from relying on each other’s DOM structure too much.

* Although such encapsulation is desirable for application-level components like `FeedStory` or `Comment`, it can be inconvenient for highly reusable “leaf” components like `FancyButton` or `MyTextInput`. 
* These components tend to be used throughout the application in a similar manner as a regular DOM button and input, and accessing their DOM nodes may be unavoidable for managing focus, selection, or animations.

* **Ref forwarding is an opt-in feature that lets some components take a ref they receive, and pass it further down (in other words, “forward” it) to a child.**

* Ex. `FancyButton` uses `React.forwardRef` to obtain the ref passed to it, and then forward it to the DOM button that it renders:

```ts
const FancyButton = React.forwardRef((props, ref) => (
    <button ref={ref} className="FancyButton">
        {props.children}
    </button>
));

// You can now get a ref directly to the DOM button:
const ref = React.createRef();
<FancyButton ref={ref}> Click me! </FancyButton>;
```

* This way, components using FancyButton can get a ref to the underlying button DOM node and access it if necessary—just like if they used a DOM button directly.
* Here is a step-by-step explanation of what happens in the above example:

1. We create a React ref by calling `React.createRef` and assign it to a ref variable.
1. We pass our ref down to `<FancyButton ref={ref}>` by specifying it as a JSX attribute.
1. React passes the ref to the `(props, ref) =>` ... function inside forwardRef as a second argument.
1. We forward this ref argument down to `<button ref={ref}>` by specifying it as a JSX attribute.
1. When the ref is attached, `ref.current` will point to the `<button>` DOM node.

> Note:

* The second ref argument only exists when you define a component with `React.forwardRef` call. 
* Regular function or class components don’t receive the ref argument, and ref is not available in props either.
* Ref forwarding is not limited to DOM components. You can forward refs to class component instances, too.

##  Note for component library maintainers
* When you start using forwardRef in a component library, you should treat it as a breaking change and release a new major version of your library. 
* This is because your library likely has an observably different behavior (such as what refs get assigned to, and what types are exported), and this can break apps and other libraries that depend on the old behavior.

## Forwarding refs in higher-order components

