https://dev.to/codeartistryio/the-react-cheatsheet-for-2020-real-world-examples-4hgg#context-and-usecontext

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
