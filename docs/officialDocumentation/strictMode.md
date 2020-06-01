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