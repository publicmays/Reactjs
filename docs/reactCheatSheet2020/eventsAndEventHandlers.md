# Events and Event Handlers

Events in React and HTML are slightly different

```ts
// Note: most event handler functions start with 'handle'
function handleToggleTheme() {
    // code to toggle app theme
}

// in html, onclick is all lowercase
<button onclick="handleToggleTheme()">
    Submit
</button>

// in JSX, onClick is camelcase, like attributes / props
// we also pass a reference to the function with curly braces
<button onClick={handleToggleTheme}>
    Submit
</button>
```

The most essential React events to know are onClick and onChange
onClick handles click events on JSX elements (namely buttons)
onChange handles keyboard events (namely inputs)

```ts
function App() {
  function handleChange(event) {
    // when passing the function to an event handler, like onChange
    // we get access to data about the event (an object)
    const inputText = event.target.value;
    const inputName = event.target.name; // myINput
    // we get the text typed in and other data from event.target
  }
  function handleSubmit() {
    // on click doesn't usually need event data
  }
  return (
    <div>
      <input type="text" name="myInput" onChange={handleChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
```
