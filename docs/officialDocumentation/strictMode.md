# Strict Mode

* StrictMode is a tool for highlighting potential problems in an application. Like Fragment, StrictMode does not render any visible UI. It activates additional checks and warnings for its descendants.

> Note:

* Strict mode checks are run in development mode only; they do not impact the production build.

* You can enable strict mode for any part of your application. For example:

```ts
import React from 'react';

function ExampleApplication() {
  return (
    <div>
      <Header />
      <React.StrictMode>
        <div>
            <ComponentOne />
            <ComponentTwo />
        </div>
      </React.StrictMode>
    </div>
  );
}
```

* In the above example, strict mode checks will not be run against the Header and Footer components. However, ComponentOne and ComponentTwo, as well as all of their descendants, will have the checks.

* StrictMode currently helps with:

* Identifying components with unsafe lifecycles
* Warning about legacy string ref API usage
* Warning about deprecated findDOMNode usage
* Detecting unexpected side effects
* Detecting legacy context API

## Identifying unsafe lifecycles

* When strict mode is enabled, React compiles a list of all class components using the unsafe lifecycles, and logs a warning message with information about these components, like so:

![](https://reactjs.org/static/e4fdbff774b356881123e69ad88eda88/1628f/strict-mode-unsafe-lifecycles-warning.png)

## Warning about legacy string ref API usage

* Previously, React provided two ways for managing refs: the legacy string ref API and the callback API. Although the string ref API was the more convenient of the two, it had several downsides and so our official recommendation was to use the callback form instead.

* React 16.3 added a third option that offers the convenience of a string ref without any of the downsides:

```ts
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef();
    }

    render() {
        return <input type="text" ref={this.inputRef} />
    }

    componentDidMount() {
        this.inputRef.current.focus();
    }
}
```

* Since object refs were largely added as a replacement for string refs, strict mode now warns about usage of string refs.

> Note:

* Callback refs will continue to be supported in addition to the new createRef API.

* You don’t need to replace callback refs in your components. They are slightly more flexible, so they will remain as an advanced feature.

## Warning about deprecated findDOMNode usage

* React used to support findDOMNode to search the tree for a DOM node given a class instance. Normally you don’t need this because you can attach a ref directly to a DOM node.

* Therefore findDOMNode only worked if components always return a single DOM node that never changes.

* You can instead make this explicit by passing a ref to your custom component and pass that along to the DOM using ref forwarding.

* You can also add a wrapper DOM node in your component and attach a ref directly to it.

```ts
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.wrapper = React.createRef();
    }

    render() {
        return <div ref={this.wrapper}>
            {this.props.children}
        </div>
    }
}
```

## Detecting unexpected side effects