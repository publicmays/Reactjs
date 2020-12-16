https://dev.to/reedbarger/the-react-cheatsheet-for-2020-real-world-examples-4hgg#reducers-and-usereducer

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
