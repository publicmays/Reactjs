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