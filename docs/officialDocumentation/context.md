# Context

## When to Use Context

* Context is designed to share data that can be considered “global” for a tree of React components, such as the current authenticated user, theme, or preferred language. 
* Ex. manually thread through a “theme” prop in order to style the Button component:

```ts
class App extends React.Component {
    render() {
        return <Toolbar theme="dark" />;
    }
}

function Toolbar(props) {
    // The Toolbar component must take an extra "theme" prop
    // and pass it to the ThemedButton. This can become painful
    // if every single button in the app needs to know the theme
    // because it would have to be passed through all components.
    return(
        <div>
            <ThemedButton theme={props.theme} />
        </div>
    );
}

class ThemedButton extends React.Component {
    render() {
        return <Button theme={this.props.theme} />;
    }
}
```