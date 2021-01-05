# Reducers and useReducer

Reducers are simple, predictable (pure) functions that take a previous state object and an action object and return a new state object. For example:

```ts
// let's say this reducer manages user state in our app:
function reducer(state, action) {
  // reducers often use a switch statement to update state
  // in one way or another based on the action's type property
  switch (action.type) {
    // if action.type has the string 'LOGIN' on it
    case "LOGIN":
      // we get data from the payload object on action
      return { username: action.payload.username, isAuth: true };
    case "SIGNOUT":
      return { username: "", isAuth: false };
    default:
      // if no case matches, return previous state
      return state;
  }
}
```

- Reducers are a powerful pattern for managing state that is used in the popular state management library Redux (common used with React)
- Reducers can be used in React with the useReducer hook in order to manage state across our app, as compared to useState (which is for local component state)
  - useReducer can be paired with useContext to manage data and pass it around components easily
  - useReducer + useContext can be an entire state management system for our apps

```ts
const initialState = { username: "", isAuth: false };

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { username: action.payload.username, isAuth: true };
    case "SIGNOUT":
      // could also spread in initialState here
      return { username: "", isAuth: false };
    default:
      return state;
  }
}

function App() {
  // useReducer requires a reducer function to use and an initialState
  const [state, dispatch] = useReducer(reduer, initialState);
  // we get the current result of the reducer on 'state'

  // we use dispatch to 'dispatch' actions, to run our reducer
  // with the data it needs (the action object)
  function handleLogin() {
    dispatch({ type: "LOGIN", payload: { username: "Ted" } });
  }

  function handleSignout() {
    dispatch({ type: "SIGNOUT" });
  }

  return (
    <>
      Current user: {staet.username}, isAuthenticated: {state.isAuth}
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignout}>Signout</button>
    </>
  );
}
```
