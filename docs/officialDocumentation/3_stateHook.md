# Using the State Hook

* function components in React look like this

```ts
const Example = (props) => {
    // You can use hooks here!
    return <div />;
};
```

```ts
function Example(props) {
    / You can use hooks here!
    return <div />;
}
```

* Hooks don’t work inside classes. But you can use them instead of writing classes.

# Hook Definition
* special function that lets you "hook into" React features.
* `useState` is a Hook adds React state to function components.

# When would I use a Hook?
* If you write a function component and realize you need to add some state to it
* previously you had to convert it to a class.

# Declaring a State Variable

Class

```ts
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
```

Function Component
* we have no `this`
* Instead of `this.state` we use `useState` Hook directly

```ts
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
```

* state variable are preserved in React

# What does useState return? 

* a pair of values: the current state and a function that updates it.

# Reading State

Class

```ts
<p>You clicked {this.state.count} times</p>
```

Function Component
```ts
<p>You clicked {count} times</p>
```

# Updating State

Class

```ts
  <button onClick={() => this.setState({ count: this.state.count + 1 })}>
    Click me
  </button>
```

Function Component

```ts
  <button onClick={() => setCount(count+1)}>
    Click me
  </button>
```

# Array Destructuring

```ts
const [fruit, setFruit] = useState('banana');
```

* make 2 new variables `fruit`, `setFruit`
* `fruit` is set to the first value returned by useState
* `setFruit` is the second

Equivalent to: 

```ts
var fruitStateVariable = useState('banana'); // Returns a pair
  var fruit = fruitStateVariable[0]; // First item in a pair
  var setFruit = fruitStateVariable[1]; // Second item in a pair
```