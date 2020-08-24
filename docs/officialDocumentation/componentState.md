# Component State

## What does setState do?

`setState()` schedules an update to a component’s state object. When state changes, the component responds by re-rendering.

## What is the difference between state and props?

props (short for “properties”) and state are both plain JavaScript objects. While both hold information that influences the output of render, they are different in one important way: props get passed to the component (similar to function parameters) whereas state is managed within the component (similar to variables declared within a function).

Here are some good resources for further reading on when to use props vs state:

|                                              | _props_ | _state_ |
| -------------------------------------------- | ------- | ------- |
| Can get initial value from parent Component? | Yes     | Yes     |
| Can be changed by parent Component?          | Yes     | No      |
| Can set default values inside Component?\*   | Yes     | Yes     |
| Can change inside Component?                 | No      | Yes     |
| Can set initial value for child Components?  | Yes     | Yes     |
| Can change in child Components?              | Yes     | No      |

## Why is setState giving me the wrong value?

In React, both this.props and this.state represent the rendered values, i.e. what’s currently on the screen.

Calls to setState are asynchronous - don’t rely on this.state to reflect the new value immediately after calling setState. Pass an updater function instead of an object if you need to compute values based on the current state (see below for details).

Example of code that will not behave as expected:

```ts
incrementCount() {
    // Note: this will *not* work as intended.
    this.setState({count: this.state.count+1});
}

handleSomething() {
    // Let's say `this.state.count` starts at 0.
    this.incrementCount();
    this.incrementCount();
    this.incrementCount();
    // When React re-renderes the component, `this.state.count` will be 1, but you expected 3.

    // This is because `incrementCount()` function above reads from `this.state.count`,
   // but React doesn't update `this.state.count` until the component is re-rendered.
   // So `incrementCount()` ends up reading `this.state.count` as 0 every time, and sets it to 1.

    // The fix is described below!
}
```

See below for how to fix this problem.

## How do I update state with values that depend on the current state?

Pass a function instead of an object to setState to ensure the call always uses the most updated version of state (see below).

## What is the difference between passing an object or a function in setState?

Passing an update function allows you to access the current state value inside the updater. Since `setState` calls are batched, this lets you chain updates and ensure they build on top of each other instead of conflicting:

```ts
incrementCount() {
    this.setState(() => {
        // Important: read `state` instead of `this.state` when updating
        return {count: state.count+1}
    });
}

handleSomething() {
    // Let's say `this.state.count` starts at 0
    this.incrementCount();
    this.incrementCount();
    this.incrementCount();

    // If you read `this.state.count` now, it would still be 0.
    // But when React re-renders the component, it will be 3.
}
```

## When is setState asynchronous?
