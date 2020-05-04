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