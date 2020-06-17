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

## renderToString()

```ts
ReactDOMServer.renderToString(element)
```

* Render a React element to its initial HTML. React will return an HTML string. You can use this method to generate HTML on the server and send the markup down on the initial request for faster page loads and to allow search engines to crawl your pages for SEO purposes.

* If you call `ReactDOM.hydrate()` on a node that already has this server-rendered markup, React will preserve it and only attach event handlers, allowing you to have a very performant first-load experience.

## renderToStaticMarkup()