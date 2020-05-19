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