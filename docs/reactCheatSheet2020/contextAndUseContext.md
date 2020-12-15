# Context and useContext

In React, we want to avoid the following problem of creating multiple props to pass data down two or more levels from a parent component

```ts
// Context helps us avoid creating multiple duplicate props
// This pattern is also called props drilling:
function App() {
  // we want to pass user data down to Header
  const [user] = React.useState({ name: "Fred" });

  return (
    // first 'user' prop
    <Main user={user} />
  );
}

const Main = ({ user }) => (
  <>
    {/* second 'user' prop */}
    <Header user={user} />
    <div>Main app content...</div>
  </>
);

const Header = ({ user }) => <header>Welcome, {user.name}!</header>;
```

Context is helpful for passing props down multiple levels of child components from a parent component

```ts
// Here is the previous example rewritten with Context
// First we create context, where we can pass in default values

const UserContext = React.createContext();
// we call this 'UserContext' because that's what data we're passing down
function App() {
  // we want to pass user data down to Header
  const [user] = React.useState({name: "Fred"});

  return (
    {/* we wrap the parent component with the provider property */}
    {/* we pass data down the computer tree w/ value prop */}
    <UserContext.Provider value={user}>
      <Main />
    </UserContext.Provider>
  );
}

const Main = () => (
  <>
    <Header />
    <div>Main app content...</div>
  </>
);

// we can remove the two 'user' props, we can just use consumer
// to consume the data where we need it
const Header = () => (
  {/* we use this pattern called render props to get access to the data*/}
  <UserContext.Consumer>
    {user => <header>Welcome, {user.name}!</header>}
  </UserContext.Consumer>
);
```

The useContext hook can remove this unusual-looking render props pattern, however to be able to consume context in whatever function component we like

```ts
const Header = () => {
  // we pass in the entire context object to consume it
  const user = React.useContext(UserContext);
  // and we can remove the Consumer tags
  return <header>Welcome, {user.name}!</header>;
};
```
