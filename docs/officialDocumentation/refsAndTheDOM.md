# Refs and the DOM

* Refs provide a way to access DOM nodes or React elements created in the render method.

* In the typical React dataflow, props are the only way that parent components interact with their children. To modify a child, you re-render it with new props. However, there are a few cases where you need to imperatively modify a child outside of the typical dataflow. The child to be modified could be an instance of a React component, or it could be a DOM element. For both of these cases, React provides an escape hatch.

## When to Use Refs

* Managing focus, text selection, or media playback.
* Triggering imperative animations.
* Integrating with third-party DOM libraries.

* Avoid using refs for anything that can be done declaratively.

* For example, instead of exposing `open()` and `close()` methods on a Dialog component, pass an `isOpen` prop to it.

## Don’t Overuse Refs

* Your first inclination may be to use refs to “make things happen” in your app. If this is the case, take a moment and think more critically about where state should be owned in the component hierarchy. 
* Often, it becomes clear that the proper place to “own” that state is at a higher level in the hierarchy. See the Lifting State Up guide for examples of this.

## Creating Refs

* Refs are created using React.createRef() and attached to React elements via the ref attribute. 
* Refs are commonly assigned to an instance property when a component is constructed so they can be referenced throughout the component.

```ts
class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }
    render() {
        return <div ref={this.myRef} />;
    }
}
```

## Accessing Refs

* When a ref is passed to an element in `render`, a reference to the node becomes accessible at the `current` attribute of the ref.

```ts
const node = this.myRef.current;
```

* The value of the `ref` differs depending on the type of the node:

* When the `ref` attribute is used on an HTML element, the `ref` created in the constructor with `React.createRef()`() receives the underlying DOM element as its current property.
* When the `ref` attribute is used on a custom class component, the `ref` object receives the mounted instance of the component as its current.
* You may not use the `ref` attribute on function components because they don’t have instances.

* The examples below demonstrate the differences.

### Adding a Ref to a DOM Element

* This code uses a `ref` to store a reference to a DOM node:

```ts
class CustomTextInput extends React.Component {
    constructor(props) {
        super(props);

        // create a ref to store the textInput DOM element
        this.textInput = React.createRef();
        this.focusTextInput = this.focusTextInput.bind(this);
    }

    focusTextInput() {
        // Explicitly focus the text input using the raw DOM API
        // Note: we're accessing "current" to get the DOM node
        this.textInput.current.focus();
    }

    render() {
        return (
            <div>
                <input 
                    type="text"
                    ref={this.textInput} 
                />
                <input 
                    type="button"
                    value="Focus the text input"
                    onClick={this.focusTextInput}
                />
            </div>
        );
    }
}
```

* React will assign the current property with the DOM element when the component mounts, and assign it back to null when it unmounts. 
* `ref` updates happen before `componentDidMount` or `componentDidUpdate` lifecycle methods.

### Adding a Ref to a Class Component