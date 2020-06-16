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