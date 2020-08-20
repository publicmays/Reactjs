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

You can use an arrow function to wrap around an event handler and pass parameters:

```ts
<button onClick={() => this.handleClick(id)} />
```

This is equivalent to calling `.bind`

```ts
<button onClick={this.handleClick.bind(this, id)} />
```

### Example: Passing params using arrow functions

```ts
const A = 65; // ASCII character code
class Alphabet extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      justClicked: null,
      letters: Array.from({ length: 26 }, (_, i) => String.fromCharCode(A + i)),
    };
  }
  handleClick(letter) {
    this.setState({ justClicked: letter });
  }
  render() {
    return (
      <div>
        Just clicked: {this.state.justClicked}
        <ul>
          {this.state.letters.map((letter) => (
            <li key={letter} onClick={() => this.handleClick(letter)}>
              {letter}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
```

### Example: Passing params using data-attributes

Alternately, you can use DOM APIs to store data needed for event handlers. Consider this approach if you need to optimize a large number of elements or have a render tree that relies on React.PureComponent equality checks.

```ts
const A = 65; // ASCII character code

class Alphabet extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      justClicked: null,
      letters: Array.from({ length: 26 }, (_, i) => String.fromCharCode(A + i)),
    };
  }

  handleClick(e) {
    this.setState({
      justClicked: e.target.dataset.letter,
    });
  }

  render() {
    return (
      <div>
        Just clicked: {this.state.justClicked}
        <ul>
          {this.state.letters.map((letter) => (
            <li key={letter} data-letter={letter} onClick={this.handleClick}>
              {letter}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
```

### How can I prevent a function from being called too quickly or too many times in a row?

If you have an event handler such as onClick or onScroll and want to prevent the callback from being fired too quickly, then you can limit the rate at which callback is executed. This can be done by using:

- throttling: sample changes based on a time based frequency (eg \_.throttle)
- debouncing: publish changes after a period of inactivity (eg \_.debounce)
- requestAnimationFrame throttling: sample changes based on requestAnimationFrame (eg raf-schd)

See this [visualization](http://demo.nimius.net/debounce_throttle/) for a comparison of throttle and debounce functions.

> Note:

- `_.debounce, _.throttle and raf-schd` provide a cancel method to cancel delayed callbacks. You should either call this method from componentWillUnmount or check to ensure that the component is still mounted within the delayed function.

### Throttle

Throttling prevents a function from being called more than once in a given window of time. The example below throttles a “click” handler to prevent calling it more than once per second.

```ts
import throttle from "lodash.throttle";

class LoadMoreButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickThrottled = throttle(this.handleClick, 1000);
  }
  componentWillUnmount() {
    this.handleClickThrottled.cancel();
  }
  render() {
    return <button onClick={this.handleClickThrottled}>Load More</button>;
  }
  handleClick() {
    this.props.loadMore();
  }
}
```

### Debounce

Debouncing ensures that a function will not be executed until after a certain amount of time has passed since it was last called. This can be useful when you have to perform some expensive calculation in response to an event that might dispatch rapidly (eg scroll or keyboard events). The example below debounces text input with a 250ms delay.

```ts
import debounce from "lodash.debounce";

class Searchbox extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.emitChangeDebounced = debounce(this.emitChange, 250);
  }

  componentWillUnmount() {
    this.emitChangeDebounced.cancel();
  }

  render() {
    return (
      <input
        type="text"
        onChange={this.handleChange}
        placeholder="Search..."
        defaultValue={this.props.value}
      />
    );
  }

  handleChange(e) {
    // React pools events, so we read the value before debounce.
    // Alternately we would call `event.persist()` and pass the entire event.
    // For more info see reactjs.org/docs/events.html#event-pooling
    this.emitChangeDebounced(e.target.value);
  }

  emitChange(value) {
    this.props.onChange(value);
  }
}
```

### requestAnimationFrame throttling
