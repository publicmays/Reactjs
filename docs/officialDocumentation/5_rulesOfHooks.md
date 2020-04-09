# Only Call Hooks at the Top Level
* Ensured that Hooks are called in the same order each time a component renders. 
* Allows React to correctly preserve the state of Hooks between multiple useState and useEffect calls.

# Only Call Hooks from React Functions
* Don’t call Hooks from regular JavaScript functions. Instead, you can:

* Call Hooks from React function components.
* Call Hooks from custom Hooks
* You ensure that all stateful logic in a component is clearly visible from its source code.

# Explanation

```ts
function Form() {
    // 1. Use the name state variable
    const [name, setName] = useState('Mary');
  
    // 2. Use an effect for persisting the form
    useEffect(function persistForm() {
      localStorage.setItem('formData', name);
    });
  
    // 3. Use the surname state variable
    const [surname, setSurname] = useState('Poppins');
  
    // 4. Use an effect for updating the title
    useEffect(function updateTitle() {
      document.title = name + ' ' + surname;
    });
  
    // ...
}
```

```ts
// ------------
// First render
// ------------
useState('Mary')           // 1. Initialize the name state variable with 'Mary'
useEffect(persistForm)     // 2. Add an effect for persisting the form
useState('Poppins')        // 3. Initialize the surname state variable with 'Poppins'
useEffect(updateTitle)     // 4. Add an effect for updating the title

// -------------
// Second render
// -------------
useState('Mary')           // 1. Read the name state variable (argument is ignored)
useEffect(persistForm)     // 2. Replace the effect for persisting the form
useState('Poppins')        // 3. Read the surname state variable (argument is ignored)
useEffect(updateTitle)     // 4. Replace the effect for updating the title

// ...
```

```ts
 // We're breaking the first rule by using a Hook in a condition
  if (name !== '') {
    useEffect(function persistForm() {
      localStorage.setItem('formData', name);
    });
  }
```

* If we want to run an effect conditionally, we can put that condition inside our Hook:

```ts
useEffect(function persistForm() {
    // We're not breaking the first rule anymore
    if (name !== '') {
      localStorage.setItem('formData', name);
    }
  });
```