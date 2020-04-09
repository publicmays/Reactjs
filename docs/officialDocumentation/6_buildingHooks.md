# Building Your Own Hooks

# Extracting a Custom Hook

```ts
import { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```

# Using a Custom Hook

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
function FriendListItem(prop) {
    const isOnline = useFriendStatus(props.friend.id);

    return (
        <li style={{ color: isOnline ? 'green' : 'black' }}>
            {props.friend.name}
        </li>
    );
}
```

# Tip: Pass Information Between Hooks


```ts
const friendList = [
    { id: 1, name: 'Phoebe' },
    { id: 2, name: 'Rachel' },
    { id: 3, name: 'Ross' },
];

function ChatRecipientPicker() {
    const [recipientID, setRecipientID] = useState(1);
    const isRecipientOnline = useFriendStatus(recipientID);

    return (
        <>
            <Circle color={isRecipientOnline ? 'green' : 'red' }/>
            <select
                value={recipientID}
                onChange={e => setRecipientID(Number(e.target.value))}>
                {friendList.map(friend => (
                    <option key={friend.id} value={friend.id}>
                        {friend.name}
                    </option>
                ))}
            </select>
        </>
    );
}

```

# `useYourImagination()`
* If you have a complex component that contains a lot of local state that is managed in an ad-hoc way. 
* `useState` doesn’t make centralizing the update logic any easier so you might prefer to write it as a Redux reducer:

```ts
function todosReducer(state, action) {
    switch (action.type) {
        case 'add':
            return [...state, {
                text: action.text,
                completed: false
            }];
        
        // ... other actions ...
        default:
            return state;
    }
}
```

* Reducers are convenient to test in isolation, and scale to express complex update logic.

* Example: `useReducer` Hook that lets us manage the local state of our component with a reducer.

```ts
function useReducer(reducer, initialState) {
    const [state, setState] = useState(initialState);

    function dispatch(action) {
        const nextState = reducer(state, action);
        setState(nextState);
    }

    return [state, dispatch];
}
```

* use it in our component, and let the reducer drive its state management:

```ts
function Todos() {
    const [todos, dispatch] = useReducer(todosReducer, []);

    function handleAddClick(text) {
        dispatch({type: 'add', text});
    }
}
```