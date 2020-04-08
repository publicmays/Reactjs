# Effect Hook

* `side effects` or `effects` affect other components and can't be done during rerendering
* `useEffect` allows side effects from a function component

* run your `effect` after flushing changes to the DOM
* Effects have access to props & state
* React runs the effect after ever rerender including the _first_ render
```ts
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
```

* Effects can specify how to clean up after them by returning a function
* unsubscribes from `ChatAPI` when component unmounts

```ts
import React, { useState, useEffect } from 'react';

function FriendStatus(props) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

## Rules of Hooks
1. Only call Hooks at the top level, not inside loops, conditions, or nested functions.

1. Only call Hooks from React function components not regular Javascript functions.

# Building your own Hooks

* reuse stateful logic between components
* `higher-order components` + `render props` functionality = `hooks` functionality without adding more components
* custom hook `useFriendStatus`

```ts
import React, { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```

* now we can use it from both components
* state is independent
* hooks can reuse _stateful logic_
* each call to a hook is in an isolated state
* can use same custom hook twice in a component

```ts
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
```

```ts
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```

```ts
// Best Practice
if (functions.name.startsWith('use') and calls other Hooks)
    function == customHook
```

# Other Hooks

* `useContext` subscribes to React context without using nesting

```ts
function Example() {
  const locale = useContext(LocaleContext);
  const theme = useContext(ThemeContext);
  // ...
}
```

* `useReducer` manages local state of complex components with a reducer

```ts
function Todos() {
  const [todos, dispatch] = useReducer(todosReducer);
  // ...
```