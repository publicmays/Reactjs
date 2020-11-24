https://dev.to/codeartistryio/the-react-cheatsheet-for-2020-real-world-examples-4hgg#side-effects-and-useeffect

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
