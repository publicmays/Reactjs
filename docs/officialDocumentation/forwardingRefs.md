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

```