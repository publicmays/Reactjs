https://dev.to/reedbarger/the-react-cheatsheet-for-2020-real-world-examples-4hgg#rules-of-hooks

# Rules of hooks

There are two core rules of using React hooks that we cannot violate for them to work properly:

1. Hooks can only be called at the top of components
   Hooks cannot be in conditionals, loops or nested functions
2. Hooks can only be used within function components
   Hooks cannot be in normal JavaScript functions or class components

```ts
function checkAuth() {
  // Rule 2 Violated! Hooks cannot be used in normal functions, only components
  React.useEffect(() => {
    getUser();
  }, []);
}

function App() {
  // this is the only validly executed hook in this component
  const [user, setUser] = React.useState(null);

  // Rule 1 violated! Hooks cannot be used within conditionals (or loops
  if (!user) {
    React.useEffect(() => {
      setUser({ isAuth: false });
      // if you want to conditionally execute an effect, use the
      // dependencies array for useEffect
    }, []);
  }

  checkAuth();

  // Rule 1 violated! Hooks cannot be used in nested functions
  return <div onClick={() => React.useMemo(() => doStuff(), [])}>Our app</div>;
}
```
