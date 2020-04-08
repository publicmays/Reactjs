# Using the State Hook

* function components in React look like this

```ts
const Example = (props) => {
    // You can use hooks here!
    return <div />;
};
```

```ts
function Example(props) {
    / You can use hooks here!
    return <div />;
}
```

* Hooks don’t work inside classes. But you can use them instead of writing classes.

# Hook Definition
* special function that lets you "hook into" React features.
* `useState` is a Hook adds React state to function components.

# When would I use a Hook?
* If you write a function component and realize you need to add some state to it
* previously you had to convert it to a class.