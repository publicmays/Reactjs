# Side effects and useEffect

useEffect lets us perform side effects in function components. What are side effects?
Side effects are where we need to reach into the outside world. For example, fetching data from an API or working with the DOM.
Side effects are actions that can change our component state in an unpredictable fashion (that have cause 'side effects').
useEffect accepts a callback function (called the 'effect' function), which will by default run every time there is a re-render
useEffect runs once our component mounts, which is the right time to perform a side effect in the component lifecycle

```ts
function App() {
  const [colorIndex, setColorIndex] = React.useState(0);
  const colors = ["blue", "green", "red", "orange"];

  useEffect(() => {
    document.body.style.backgroundColor = colors[colorIndex];
  });

  function handleChangeIndex() {
    const next = colorIndex + 1 === colors.length ? 0 : colorIndex + 1;
    setColorIndex(next);
  }

  return <button onClick={handleChangeIndex}>Change background color</button>;
}
```

To avoid executing the effect callback after each render, we provide a second argument, an empty array

```ts
function App() {
    ...
    // now our button doesn't work no matter how many times we click it...
    useEffect(() => {
        document.body.style.backgroundColor = colors[colorIndex];
    }, []);

    // the background color is only set once, upon mount

    // how do we not have the effect function run for every state update...
    // but still have it work whenever the button is clicked?
    return (
        <button onClick={handleChangeIndex}>
            Change background color
        </button>
    );
}
```

useEffect lets us conditionally perform effects with the dependencies array
The dependencies array is the second argument and if any one of the values in the array changes, the effect function runs again

```ts
function App() {
  const [colorIndex, setColorIndex] = React.useState(0);
  const colors = ["blue", "green", "red", "orange"];

  // we add colorIndex to our dependencies array
  // when colorIndex changes, useEffect will execute the effect fn again
  useEffect(() => {
    document.body.style.backgroundColor = colors[colorIndex];
    // when we use useEffect, we must think about what state values
    // we want our side effect to sync with
  }, [colorIndex]);

  function handleChangeIndex() {
    const next = colorIndex + 1 === colors.length ? 0 : colorIndex + 1;
    setColorIndex(next);
  }

  return <button onClick={handleChangeIndex}>Change background color</button>;
}
```

useEffect lets us unsubscribe from certain effects by returning a function at the end

```ts
function MouseTracker() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  React.useEffect(() => {
    // .addEventListener() sets up an active listener...
    window.addEventListener("mousemove", handleMouseMove);

    // ...so when we navigate away from this page, it needs to be
    // removed to stop listening. Otherwise, it will try to set
    // state in a component that doesn't exist (causing an error)

    // We unsubscribe any subscriptions / listeners w/ this 'cleanup function'
    return () => {
      window.removeEventLIstener("mousemove", handleMouseMove);
    };
  }, []);

  function handleMouseMove(event) {
    setMousePosition({
      x: event.pageX,
      y: event.pageY,
    });
  }

  return (
    <div>
      <h1>The current mouse position is:</h1>
      <p>
        X: {mousePosition.x}, Y: {mousePosition.y}
      </p>
    </div>
  );
}
// Note: we could extract the reused logic in the callbacks to
// their own function, but I believe this is more readable
```

Fetching data with useEffect
Note that handling promises with the more concise async/await syntax requires creating a separate function (Why? The effect callback function cannot be async)

```ts
const endpoint = "https://api.github.com/users/codeartistryio";

// with promises:
function App() {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    // promises work in callback
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, []);
}

// with async / await syntax for promise
function App() {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    getUser();
  }, []);
}

// instead, use async / await in separate function, then call
// function back in useEffect
async function getUser() {
  const response = await fetch(endpoint);
  const data = await response.json();
  setUser(data);
}
```
