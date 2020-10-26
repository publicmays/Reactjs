# Elements and JSX

The basic syntax for a React element

```ts
// In a nutshell, JSX allows us to write HTML in our JS
// JSX can use any valid html tags (i.e. div/span, h1-h6, form/input, etc)
<div>Hello React</div>
```

JSX elements are expressions

```ts
// as an expression, JSX can be assigned to variables

const isNewToReact = true;

// ... or can be displayed conditionally
function sayGreeting() {
  if (isNewToReact) {
    // ... or returned from functions, etc.
    return greeting; // displays: Hello React
  } else {
    return <div>Hi again, React</div>;
  }
}
```

JSX allows us to nest expressions

```ts
const year = 2020;
// we can insert primitive JS values in curly braces: {}
const greeting = <div>Hello React in {year}</div>;
// trying to insert objects will result in an error
```

HTML and JSX have a slightly different syntax

```ts
// Empty div is not <div></div> (HTML), but <div/> (JSX)
<div/>

// A single tag element like input is not <input> (HTML), but <input/> (JSX)
<input name="email" />

// Attributes are written in camelcase for JSX (like JS variables
<button className="submit-button"></button> // not 'class' (HTML)
```

The most basic React app requires three things:

1. ReactDOM.render() to render our app
2. A JSX element (called a root node in this context)
3. A DOM element within which to mount the app (usually a div with an id of root in an index.html file)

```ts
// imports needed if using NPM package; not if from CDN links
import React from "react";
import ReactDOM from "react-dom";

const greeting = <h1>Hello React</h1>;

// ReactDOM.render(root node, mounting point)
ReactDOM.render(greeting, document.getElementById("root"));
```
