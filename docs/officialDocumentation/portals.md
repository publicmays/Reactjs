# Portals

* Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.

```ts
ReactDOM.createPortal(child, container)
```

1. `(child)` is any renderable React child, such as an element, string, or fragment. 
1. `(container)` is a DOM element.

## Usage

* Normally, when you return an element from a component’s render method, it’s mounted into the DOM as a child of the nearest parent node:

```ts
render() {
    // React mounts a new div and renders the children into it
    return (
        <div>
            {this.props.children}
        </div>
    );
}
```

* However, sometimes it’s useful to insert a child into a different location in the DOM:

```ts

```