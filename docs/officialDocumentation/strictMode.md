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

```