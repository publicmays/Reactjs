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