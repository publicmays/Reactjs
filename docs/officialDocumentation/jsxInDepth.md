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

## Specifying The React Element Type
* The first part of a JSX tag determines the type of the React element.

* Capitalized types indicate that the JSX tag is referring to a React component. These tags get compiled into a direct reference to the named variable, so if you use the JSX `<Foo />` expression, Foo must be in scope.

### React Must Be in Scope

* Since JSX compiles into calls to React.createElement, the React library must also always be in scope from your JSX code.

* For example, both of the imports are necessary in this code, even though `React` and `CustomButton` are not directly referenced from JavaScript:

```ts
import React from 'react';
import CustomButton from './CustomButton';

function WarningButton() {
  // return React.createElement(CustomButton, {color: 'red'}, null);
  return <CustomButton color="red" />;
}
```

* If you don’t use a JavaScript bundler and loaded React from a `<script>` tag, it is already in scope as the React global.


### Using Dot Notation for JSX Type