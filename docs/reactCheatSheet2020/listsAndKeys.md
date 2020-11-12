# Lists and Keys

Use .map() to convert lists of data (arrays) into lists of elements

```ts
const people = ["John", "Bob", "Fred"];
const peopleList = people.map(person => <p>{person</p>);
```

.map() is also used for components as well as elements

```ts
function App() {
  const people = ["John", "Bob", "Fred"];
  // can interpolate returned list of elements in {}
  return (
    <ul>
      {/* we're passing each array element as props */}
      {people.map((person) => (
        <Person name={person} />
      ))}
    </ul>
  );
}

function Person({ name }) {
  // gets 'name' prop using object destructuring
  return <p>this person's name is {name}</p>;
}
```

Each React element iterated over needs a special 'key' prop
Keys are essential for React to be able to keep track of each element that is being iterated over with map
Without keys, it is harder for it to figure out how elements should be updated when data changes
Keys should be unique values to represent the fact that these elements are separate from one another

```ts
function App() {
  const people = ["John", "Bob", "Fred"];
  return (
    <ul>
      {/* keys need to be primitive values, ideally a generated id */}
      {people.map((person) => (
        <Person key={person} name={person} />
      ))}
    </ul>
  );
}

// If you don't have ids with your set of data or unique primitive values,
// you can use the second parameter of .map() to get each elements index
function App() {
  const people = ["John", "Bob", "Fred"];
  return (
    <ul>
      {/* use array element index for key */}
      {people.map((person, i) => (
        <Person key={i} name={person} />
      ))}
    </ul>
  );
}
```
