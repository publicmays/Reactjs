# JSX In Depth

* Fundamentally, JSX just provides syntactic sugar for the React
* `createElement(component, props, ...children)` function. 
* The JSX code:

```ts
<MyButton color="blue" shadowSize={2}>
    Click Me
</MyButton>
```

* Compiles into

```ts
React.createElement(
    MyButton,
    {color: 'blue', shadowSize: 2},
    'Click Me'
)
```

* You can also use the self-closing form of the tag if there are no children. So:

```ts

```