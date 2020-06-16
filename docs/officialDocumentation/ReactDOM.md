# ReactDOM

* If you load React from a <script> tag, these top-level APIs are available on the ReactDOM global. If you use ES6 with npm, you can write import ReactDOM from 'react-dom'. 

## Overview

* The react-dom package provides DOM-specific methods that can be used at the top level of your app and as an escape hatch to get outside of the React model if you need to. Most of your components should not need to use this module.

```ts
render()
hydrate()
unmountComponentAtNode()
findDOMNode()
createPortal()
```

## Reference

### render()

```ts
ReactDOM.render(element, container[, callback])
```

* Render a React element into the DOM in the supplied container and return a reference to the component (or returns null for stateless components).

* If the React element was previously rendered into container, this will perform an update on it and only mutate the DOM as necessary to reflect the latest React element.

* If the optional callback is provided, it will be executed after the component is rendered or updated.

### hydrate()

```ts
ReactDOM.hydrate(element, container[, callback])
```

* Same as render(), but is used to hydrate a container whose HTML contents were rendered by ReactDOMServer. React will attempt to attach event listeners to the existing markup.

* React expects that the rendered content is identical between the server and the client. It can patch up differences in text content, but you should treat mismatches as bugs and fix them. In development mode, React warns about mismatches during hydration. There are no guarantees that attribute differences will be patched up in case of mismatches. This is important for performance reasons because in most apps, mismatches are rare, and so validating all markup would be prohibitively expensive.

* If a single element’s attribute or text content is unavoidably different between the server and the client (for example, a timestamp), you may silence the warning by adding suppressHydrationWarning={true} to the element. It only works one level deep, and is intended to be an escape hatch. Don’t overuse it. Unless it’s text content, React still won’t attempt to patch it up, so it may remain inconsistent until future updates.

* If you intentionally need to render something different on the server and the client, you can do a two-pass rendering. Components that render something different on the client can read a state variable like this.state.isClient, which you can set to true in componentDidMount(). This way the initial render pass will render the same content as the server, avoiding mismatches, but an additional pass will happen synchronously right after hydration. Note that this approach will make your components slower because they have to render twice, so use it with caution.

* Remember to be mindful of user experience on slow connections. The JavaScript code may load significantly later than the initial HTML render, so if you render something different in the client-only pass, the transition can be jarring. However, if executed well, it may be beneficial to render a “shell” of the application on the server, and only show some of the extra widgets on the client. To learn how to do this without getting the markup mismatch issues, refer to the explanation in the previous paragraph.

### unmountComponentAtNode()

```ts
ReactDOM.unmountComponentAtNode(container)
```

* Remove a mounted React component from the DOM and clean up its event handlers and state. If no component was mounted in the container, calling this function does nothing. Returns true if a component was unmounted and false if there was no component to unmount.

### createPortal()

```ts
ReactDOM.createPortal(child, container)
```

* Creates a portal. Portals provide a way to render children into a DOM node that exists outside the hierarchy of the DOM component.