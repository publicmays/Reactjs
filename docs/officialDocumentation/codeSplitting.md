# Code-Splitting
* Bundling is the process of following imported files and merging them into a single file: a “bundle”. 
* This bundle can then be included on a webpage to load an entire app at once

App:

```ts
// app.js
import { add } from './math.js;

console.log(add(16, 26)); // 42
```

```ts
// math.js
export function add(a, b) {
    return a + b;
}
```

Bundle:

```ts
function add (a, b) {
    return a + b;
}
console.log(add(16, 26)); // 42
```

Problem: 
```ts
large bundle === app load time is long
```

Solution:
* To avoid a large bundle “split” your bundle. 
* Code-Splitting is a feature supported by bundlers like Webpack, Rollup and Browserify (via factor-bundle) which can create multiple bundles that can be dynamically loaded at runtime.
* “lazy-load” the things that are currently needed by the user, which can dramatically improve the performance of your app. 
* While you haven’t reduced the overall amount of code in your app, you’ve avoided loading code that the user may never need, and reduced the amount of code needed during the initial load.

## `import()`

Before:

```ts
import { add } from './math';
console.log(add(16, 26));
```

After:

```ts
import("./math").then(math => {
    console.log(math.add(16,26));
});
```

* When Webpack comes across this syntax, it automatically starts code-splitting your app

# `React.lazy`

* render a dynamic import as a regular component

Before:

```ts
import OtherComponent from './OtherComponent';
```

After:

```ts
const OtherComponent = React.lazy(() => import('./OtherComponent'));
```

* This will automatically load the bundle containing the `OtherComponent` when this component is first rendered.
* `React.lazy` takes a function that must call a dynamic `import()`. This must return a `Promise` which resolves to a module with a default `export` containing a React component.
* The lazy component should then be rendered inside a `Suspense` component, which allows us to show some fallback content (such as a loading indicator) while we’re waiting for the lazy component to load.


```ts
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <OtherComponent />
            </Suspense>
        </div>
    );
}
```

* The `fallback` prop accepts any React elements that you want to render while waiting for the component to load. 
* You can place the `Suspense` component anywhere above the lazy component.
* You can even wrap multiple lazy components with a single Suspense component.

