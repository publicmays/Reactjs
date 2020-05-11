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
<div className="sizebar" />
```

* Compiles into

```ts
React.createElemtn(
    'div',
    {className: 'sidebar'}
)
```

* If you want to test out how some specific JSX is converted into JavaScript, you can try out the [online Babel compiler](https://babeljs.io/repl/#?browsers=defaults%2C%20not%20ie%2011%2C%20not%20ie_mob%2011&build=&builtIns=false&spec=false&loose=false&code_lz=GYVwdgxgLglg9mABACwKYBt1wBQEpEDeAUIogE6pQhlIA8AJjAG4B8AEhlogO5xnr0AhLQD0jVgG4iAXyJA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=react&prettier=false&targets=&version=7.9.6&externalPlugins=).

