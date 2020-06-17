# ReactDOMServer

* The ReactDOMServer object enables you to render components to static markup. Typically, it’s used on a Node server:

```ts
// ES modules
import ReactDOMServer from 'react-dom/server';

// CommonJS
var ReactDOMServer = react('react-dom/server');
```

# Overview

* The following methods can be used in both the server and browser environments:

```ts
renderToString()
renderToStaticMarkup()
```

* These additional methods depend on a package (stream) that is only available on the server, and won’t work in the browser.

```ts
renderToNodeStream()
renderToStaticNodeStream()
```

# Reference
