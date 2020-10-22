https://dev.to/codeartistryio/the-react-cheatsheet-for-2020-real-world-examples-4hgg

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
