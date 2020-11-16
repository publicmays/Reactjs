https://dev.to/codeartistryio/the-react-cheatsheet-for-2020-real-world-examples-4hgg#state-and-usestate

# State and useState

useState gives us local state in a function component

```ts
import React from "react";

// create state variable
// syntax: const [stateVariable] = React.useState(defaultValue);
function App() {
  const [language] = React.useState("javascript");

  // we use array destructuring to declare state variable
  return <div>I am learning {language}</div>;
}
```

Note: Any hook in this section is from the React package and can be imported individually

```ts
import React, { useState } from "react";

function App() {
  const [language] = useState("javascript");

  return <div>I am learning {language}</div>;
}
```

useState also gives us a 'setter' function to update the state it creates
