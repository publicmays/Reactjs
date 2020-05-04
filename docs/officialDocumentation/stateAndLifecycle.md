# State and Lifecycle

```ts
function tick() {
    const element = (
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {new Date().toLocaleTimeString()}.</h2>
        </div>
    );
}

setInterval(tick, 1000);
```

* Encapsulate how the clock looks:

```ts
function Clock(props) {
    return(
        <div>
            <h1>Hello, world!</h1>
            <h2>It is {props.date.toLocaleTimeString()}.</h2>
        </div>
    );
}

function tick() {
    ReactDOM.render(
        <Clock date={new Date()}/>,
        document.getElementById('root');
    );
}

setInterval(tick, 1000);
```

* **Issue:** the Clock sets up a timer and updates the UI every second should be an implementation detail of the Clock.
* **Solution:** write this once and have the Clock update itself:

```ts
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

* To implement this, we need to add “state” to the Clock component.
* State is similar to props, but it is private and fully controlled by the component.

## Converting a Function to a Class

You can convert a function component like Clock to a class in five steps:

1. Create an ES6 class, with the same name, that extends React.Component.
1. Add a single empty method to it called render().
1. Move the body of the function into the render() method.
1. Replace props with this.props in the render() body.
1. Delete the remaining empty function declaration.

```ts
class Clock extends React.Component {
    render() {
        return(
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}
```

* Clock is now defined as a class rather than a function.
* The render method will be called each time an update happens, but as long as we render `<Clock />` into the same DOM node, only a single instance of the Clock class will be used. 
* This lets us use additional features such as local state and lifecycle methods.

## Adding Local State to a Class
* We will move the date from props to state in three steps:

1. Replace `this.props.date` with `this.state.date` in the `render()` method:

```ts
class Clock extends React.Component {
    render() {
        return(
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}
```

2. Add a class constructor that assigns the initial this.state:

```ts
class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
    }
    render() {
        return(
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}
```

3. Remove the date prop from the <Clock /> element:

```ts
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

* The result looks like this:

```ts
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

## Adding Lifecycle Methods to a Class
* In applications with many components, it’s very important to free up resources taken by the components when they are destroyed.

* We want to set up a timer whenever the Clock is rendered to the DOM for the first time. This is called **“mounting”** in React.

* We also want to clear that timer whenever the DOM produced by the Clock is removed. This is called **“unmounting”** in React.

* We can declare special methods on the component class to run some code when a component mounts and unmounts:

```ts
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

* These methods are called “lifecycle methods”.
* The `componentDidMount()` method runs after the component output has been rendered to the DOM. This is a good place to set up a timer:

```ts
componentDidMount() {
    this.timeID = setInterval(() => this.tick(), 1000);
}
```

* We will tear down the timer in the `componentWillUnmount()` lifecycle method:

```ts
componentWillUnmount() {
    clearInterval(this.timerID);
}
```

* Finally, we will implement a method called `tick()` that the Clock component will run every second.
* It will use `this.setState()` to schedule updates to the component local state:

```ts
class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
        <div>
          <h1>Hello, world!</h1>
          <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
        </div>
      );
    }
}

ReactDOM.render(
    <Clock />,
    document.getElementById('root')
);
```

1. When `<Clock />` is passed to `ReactDOM.render()`, React calls the constructor of the Clock component. Since Clock needs to display the current time, it initializes `this.state` with an object including the current time. We will later update this state.
1. React then calls the Clock component’s `render()` method. This is how React learns what should be displayed on the screen. React then updates the DOM to match the Clock’s render output.
1. When the Clock output is inserted in the DOM, React calls the `componentDidMount()` lifecycle method. Inside it, the Clock component asks the browser to set up a timer to call the component’s `tick()` method once a second.
1. Every second the browser calls the `tick()` method. Inside it, the Clock component schedules a UI update by calling `setState()` with an object containing the current time. Thanks to the `setState()` call, React knows the state has changed, and calls the `render()` method again to learn what should be on the screen. This time, `this.state.date` in the `render()` method will be different, and so the render output will include the updated time. React updates the DOM accordingly.
1. If the Clock component is ever removed from the DOM, React calls the `componentWillUnmount()` lifecycle method so the timer is stopped.

## Using State Correctly