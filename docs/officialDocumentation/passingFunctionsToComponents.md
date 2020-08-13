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
