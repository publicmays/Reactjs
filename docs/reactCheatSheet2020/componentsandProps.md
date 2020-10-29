https://dev.to/codeartistryio/the-react-cheatsheet-for-2020-real-world-examples-4hgg

# Components and Props

- The syntax for a basic React component

```ts
import React from "react";

// 1st component type: function component
function Header() {
  // function components must be capitalized unlike normal JS functions
  // note the capitalized name here: 'Header'
  return <h1>Hello React</h1>;
}

// function components with arrow functions are also valid
const Header = () => <h1>Hello React</h1>;

// 2nd component type: class component
// (classes are another type of function)
class Header extends React.Component {
  // class components have more boilerplate (with extends and render method)
  render() {
    return <h1>Hello React</h1>;
  }
}
```

How components are used

```ts
// do we call these function components like normal functions?

// No, to execute them and display the JSX they return..
const Header = () => <h1>Hello React</h1>;

// ...we use them as 'custom' JSX elements
ReactDOM.render(<Header />, document.getElementById("root"));

// renders: <h1>Hello React</h1>
```

Components can be reused across our app

```ts
// for example, this Header component can be reused in any app page

// this component shown for the '/' route
function IndexPage() {
  return (
    <div>
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}

// shown for the '/about' route
function AboutPage() {
  return (
    <div>
      <Header />
      <About />
      <Testimonials />
      <Footer />
    </div>
  );
}
```

Data can be dynamically passed to components with props

```ts
// What if we want to pass data to our component from a parent?
// I.e. to pass a user's name to display in our Header?
const username = "John";

// we add custom 'attributes' called props
ReactDOM.render(<Header />, document.getElementById("root"));

// we called this prop 'username', but can use any valid JS identifier

// props is the object that every component receives as an argument
function Header(props) {
  // the props we make on the component (i.e. username)
  // become properties on the props object
  return <h1> Hello {props.username}</h1>;
}
```

Props must never be directly changed (mutated)

```ts
// Components must ideally be 'pure' functions.
// That is, for every input, we be able to expect the same output

// we cannot do the following with props:
function Header(props) {
  props.username = "Doug";

  // we cannot mutate the props object, we can only read from it
  return <h1>Hello {props.username}</h1>;
}
// But what if we want to modify a prop value that comes in?
// That's where we would use state (see the useState section)
```

Children props are useful if we want to pass elements / components as props to other components
