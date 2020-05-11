# Composition vs Inheritance

* React has a powerful composition model, and we recommend using composition instead of inheritance to reuse code between components.

## Containment

* Some components don’t know their children ahead of time. This is especially common for components like `Sidebar` or `Dialog` that represent generic “boxes”.
* We recommend that such components use the special `children` prop to pass children elements directly into their output:

```ts
function FancyBorder(props) {
    return(
        <div className={'FancyBorder FancyBorder-' + props.color}>
            {props.children}
        </div>
    );
}
```

* This lets other components pass arbitrary children to them by nesting the JSX:

```ts
function WelcomeDialog() {
    return(
        <FancyBorder color="blue">
            <h1 className="Dialog-title">
                Welcome
            </h1>
            <p className="Dialog-message">
                Thank you for vising our spacecraft!
            </p>
        </FancyBorder>
    );
}
```

* Anything inside the `<FancyBorder>` JSX tag gets passed into the FancyBorder component as a children prop. 
* Since FancyBorder renders `{props.children}` inside a `<div>`, the passed elements appear in the final output.
* While this is less common, sometimes you might need multiple “holes” in a component. 
* In such cases you may come up with your own convention instead of using children:

```ts
function SplitPane(props) {
    return(
        <div className="SplitPane">
            <div className="SplitPane-left">
                {props.left}
            </div>
            <div className="SplitPane-right">
                {props.right}
            </div>
        </div>
    );
}

function App() {
    return (
        <SplitPane 
            left={<Contacts />
            }
            right={<Chat />
            } />
    );
}
```

* React elements like `<Contacts />` and `<Chat />` are just objects, so you can pass them as props like any other data. 
* This approach may remind you of “slots” in other libraries but there are no limitations on what you can pass as props in React.

Code Pen

```ts
function Contacts() {
  return <div className="Contacts" />;
}

function Chat() {
  return <div className="Chat" />;
}

function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

## Specialization

* Sometimes we think about components as being “special cases” of other components. 
* For example, we might say that a `WelcomeDialog` is a special case of `Dialog`.
* In React, this is also achieved by composition, where a more “specific” component renders a more “generic” one and configures it with props:

```ts
function Dialog(props) {
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">
                {props.title}
            </h1>
            <p className="Dialog-message">
                {props.message}
            </p>
        </FancyBorder>
    );
}

function WelcomeDialog() {
    return (
        <Dialog 
            title="Welcome"
            message="Thank you for visiting our spacecraft!"
        />
    );
}
```

Code Pen

```ts
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </FancyBorder>
  );
}

function WelcomeDialog() {
  return (
    <Dialog
      title="Welcome"
      message="Thank you for visiting our spacecraft!" />
  );
}

ReactDOM.render(
  <WelcomeDialog />,
  document.getElementById('root')
);

```

* Composition works equally well for components defined as classes:

```ts
function Dialog(props) {
    return (
        <FancyBorder color="blue">
            <h1 className="Dialog-title">
                {props.title}
            </h1>
            <p className="Dialog-message">
                {props.message}
            </p>
            {props.children}
        </FancyBorder>
    );
}

class SignUpDialog extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.state = {login: ''};
    }
    render() {
        return(
            <Dialog title="Mars Exploration Program"
                message="How should we refer to you?">
                <input value={this.state.login} />
                <button onClick={this.handleSignUp}>
                    Sign Me Up:
                </button>
            </Dialog>
        );
    }

    handleChange(e) {
        this.setState({login: e.target.value});
    }

    handleSignUp() {
        alert(`Welcome aboard, ${this.state.login}!`);
    }
}
```

Code Pen

```ts
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

function Dialog(props) {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </FancyBorder>
  );
}

class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  render() {
    return (
      <Dialog title="Mars Exploration Program"
              message="How should we refer to you?">
        <input value={this.state.login}
               onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>
          Sign Me Up!
        </button>
      </Dialog>
    );
  }

  handleChange(e) {
    this.setState({login: e.target.value});
  }

  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }
}

ReactDOM.render(
  <SignUpDialog />,
  document.getElementById('root')
);
```

## So What About Inheritance?

* At Facebook, we use React in thousands of components, and we haven’t found any use cases where we would recommend creating component inheritance hierarchies.
* Props and composition give you all the flexibility you need to customize a component’s look and behavior in an explicit and safe way. 
* Remember that components may accept arbitrary props, including primitive values, React elements, or functions.
* If you want to reuse non-UI functionality between components, we suggest extracting it into a separate JavaScript module. 
* The components may import it and use that function, object, or a class, without extending it.