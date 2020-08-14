# Passing Functions to Components

## How do I pass an event handler (like onClick) to a component?

Pass event handlers and other functions as props to child components:

```ts
<button onClick={this.handleClick}>
```

## How do I bind a function to a component instance?

There are several ways to make sure functions have access to component attributes like this.props and this.state, depending on which syntax and build steps you are using.

## Bind in Constructor (ES2015)

```ts
class Foo extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log("Click happened");
  }
  render() {
    return <button onClick={this.handleClick}>Click Me</button>;
  }
}
```

## Class Properties (Stage 3 Proposal)

```ts
class Foo extends Component {
  // Note: this syntax is experimental and not standardized yet.
  handleClick = () => {
    console.log("Click happened");
  };
  render() {
    return <button onClick={this.handleClick}>Click Me</button>;
  }
}
```

## Bind in Render

```ts
class Foo extends Component {
  handleClick() {
    console.log("Click happened");
  }
  render() {
    return <button onClick={this.handleClick.bind(this)}>Click Me</button>;
  }
}
```

> Note:

Using Function.prototype.bind in render creates a new function each time the component renders, which may have performance implications (see below).

## Arrow Function in Render

```ts
class Foo extends Component {
  handleClick() {
    console.log("Click happened");
  }
  render() {
    return <button onClick={() => this.handleClick()}> Click Me </button>;
  }
}
```

> Note:

Using an arrow function in render creates a new function each time the component renders, which may break optimizations based on strict identity comparison.

## Is it OK to use arrow functions in render methods?

Generally speaking, yes, it is OK, and it is often the easiest way to pass parameters to callback functions.

If you do have performance issues, by all means, optimize!

## Why is binding necessary at all?

In JavaScript, these two code snippets are not equivalent:

```ts
obj.method();
```

```ts
var method = obj.method;
method();
```

Binding methods helps ensure that the second snippet works the same way as the first one.

With React, typically you only need to bind the methods you pass to other components. For example, `<button onClick={this.handleClick}>` passes this.handleClick so you want to bind it. However, it is unnecessary to bind the render method or the lifecycle methods: we don’t pass them to other components.

## Why is my function being called every time the component renders?

Make sure you aren’t calling the function when you pass it to the component:

```ts
render() {
  // Wrong: handleClick is called instead of passed as a reference!
  return <button onClick={this.handleClick()}>Click Me</button>
}
```

Instead _pass the function itself_ (without parens):

```ts
render() {
  // Correct: handleClick is passed as a reference!
  return <button onClick={this.handleClick}> Click Me </button>
}
```

## How do I pass a parameter to an event handler or callback?
