# Implementation Notes

This section is a collection of implementation notes for the stack reconciler.

It is very technical and assumes a strong understanding of React public API as well as how it’s divided into core, renderers, and the reconciler. If you’re not very familiar with the React codebase, read the codebase overview first.

It also assumes an understanding of the differences between React components, their instances, and elements.

The stack reconciler was used in React 15 and earlier. It is located at src/renderers/shared/stack/reconciler.

# Video: Building React from Scratch

Paul O’Shannessy gave a talk about building React from scratch that largely inspired this document.

Both this document and his talk are simplifications of the real codebase so you might get a better understanding by getting familiar with both of them.

# Overview

The reconciler itself doesn’t have a public API. Renderers like React DOM and React Native use it to efficiently update the user interface according to the React components written by the user.

# Mounting as a Recursive Process

Let’s consider the first time you mount a component:

```ts
ReactDOM.render(<App />, rootEl);
```

React DOM will pass `<App />` along to the reconciler. Remember that <App /> is a React element, that is, a description of what to render. You can think about it as a plain object:

```ts
console.log(<App />);
// { type: App, props: {} }
```

The reconciler will check if App is a class or a function.

If App is a function, the reconciler will call App(props) to get the rendered element.

If App is a class, the reconciler will instantiate an App with new App(props), call the componentWillMount() lifecycle method, and then will call the render() method to get the rendered element.

Either way, the reconciler will learn the element App “rendered to”.

This process is recursive. App may render to a <Greeting />, Greeting may render to a <Button />, and so on. The reconciler will “drill down” through user-defined components recursively as it learns what each component renders to.

You can imagine this process as a pseudocode:

```ts
function isClass(type) {
  // React.Component subclasses have this flag
  return Boolean(type.prototype) && Boolean(type.prototype.isReactComponent);
}

// This function takes  a React elemtn (e.g. <App />)
// and returns a DOM or Native node representing the mounted tree
function mount(element) {
  var type = element.type;
  var props = element.props;

  // We will determine the rendered element
  // by either running the type as function
  // or creating an instance and calling render()
  var renderedElement;
  if (isClass(type)) {
    // Component class
    var publicInstance = new type(props);
    // Set the props
    publicInstance.props = props;
    // Call the lifecycle if necessary
    if (publicInstance.componentWillmount) {
      publicInstance.componentWillMount();
    }

    // Get the rendered element by calling render()
    renderedElement = publicInstance.render();
  } else {
    // Component function
    renderedElement = type(props);
  }

  // This process is recursive because a component may
  // return an element with a type of another component.
  return mount(renderedElement);

  // Note: this implementation is incomplete and recurses infinitely!
  // It only handles elements like <App /> or <Button />
  // It doesn't handle elements like <div /> or <p /> yet.
}

var rootEl = document.getElementById("root");
var node = mount(<App />);
rootEl.appendChild(node);
```

> Note:

This really is a pseudo-code. It isn’t similar to the real implementation. It will also cause a stack overflow because we haven’t discussed when to stop the recursion.

Let’s recap a few key ideas in the example above:

- React elements are plain objects representing the component type (e.g. App) and the props.
- User-defined components (e.g. App) can be classes or functions but they all “render to” elements.
- “Mounting” is a recursive process that creates a DOM or Native tree given the top-level React element (e.g. `<App />`).

# Mounting Host Elements

This process would be useless if we didn’t render something to the screen as a result.

In addition to user-defined (“composite”) components, React elements may also represent platform-specific (“host”) components. For example, Button might return a <div /> from its render method.

If element’s type property is a string, we are dealing with a host element:

```ts
console.log(<div />);
// { type: 'div', props: {} }
```

There is no user-defined code associated with host elements.

When the reconciler encounters a host element, it lets the renderer take care of mounting it. For example, React DOM would create a DOM node.

If the host element has children, the reconciler recursively mounts them following the same algorithm as above. It doesn’t matter whether children are host (like `<div><hr /></div>`), composite (like `<div><Button /></div>`), or both.

The DOM nodes produced by the child components will be appended to the parent DOM node, and recursively, the complete DOM structure will be assembled.

> Note:

The reconciler itself is not tied to the DOM. The exact result of mounting (sometimes called “mount image” in the source code) depends on the renderer, and can be a DOM node (React DOM), a string (React DOM Server), or a number representing a native view (React Native).

If we were to extend the code to handle host elements, it would look like this:

```ts
function isClass(type) {
  // React.Component subclasses have this flag
  return Boolean(type.prototype) && Boolean(type.prototype.isReactComponent);
}

// This function only handles element with a composite.type
// For example, it handles <App /> and <Button />, but not a <div />.
function mountComposite(element) {
  var type = element.type;
  var props = element.props;

  var renderedElement;
  if (isClass(type)) {
    // Component class
    var publicInstance = new type(props);
    publicInstance.props = props;
    // Call the lifecycle if necessary
    if (publicInstance.componentWillMount) {
      publicInstance.componentWillMount();
    }
    renderedElement = publicInstance.render();
  } else if (typeof type === "function") {
    // Component function
    renderedElement = type(props);
  }

  // This is recursive but we'll eventually reach the bottom of recursion when
  // the element is host (e.g. <div />) rather than composite (e.g. <App />).
  return mount(renderedElement);
}

// This function only handles elements with a host type.
// For example, it handles <div /> and <p /> but not an <App />.
function mountHost(element) {
  var type = element.type;
  var props = element.props;
  var children = props.children || {};
  if (!Array.isArray(children)) {
    children = [children];
  }
  children = children.filter(Boolean);

  // This block of code shouldn't be in the reconciler.
  // Different renderers might initialize nodes differently.
  // For example, React Native would create iOS or Android views.
  var node = document.createElement(type);
  Object.keys(props).forEach((propName) => {
    if (propName !== "children") {
      node.setAttribute(propName, props[propName]);
    }
  });

  // Mount the children
  children.forEach((childElement) => {
    // Children may be host (e.g. <div />) or composite (e.g. <Button />).
    // We will also mount them recursively:
    var childNode = mount(childElement);

    // This line of code is also renderer-specific.
    // It would be different depending on the renderer:
    node.appendChild(childNode);
  });

  // Return the DOM node as mount result.
  // This is where the recursion ends.
  return node;
}

function mount(element) {
  var type = element.type;
  if (typeof type === "function") {
    // User-defined components
    return mountComposite(element);
  } else if (typeof type === "string") {
    // Platform-specific components
    return mountHost(element);
  }
}

rootEl = document.getElementById("root");
var node = mount(<App />);
rootEl.appendChild(node);
```

This is working but still far from how the reconciler is really implemented. The key missing ingredient is support for updates.

# Introducing Internal Instances
