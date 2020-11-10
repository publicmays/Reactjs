https://dev.to/codeartistryio/the-react-cheatsheet-for-2020-real-world-examples-4hgg#lists-and-keys

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
