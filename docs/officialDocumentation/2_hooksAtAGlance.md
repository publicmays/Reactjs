# Effect Hook

* `side effects` or `effects` affect other components and can't be done during rerendering
* `useEffect` allows side effects from a function component

* run your `effect` after flushing changes to the DOM
* Effects have access to props & state
* React runs the effect after ever rerender including the _first_ render
```ts
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
```