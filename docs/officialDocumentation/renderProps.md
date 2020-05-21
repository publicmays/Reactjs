# Render Props

* The term “render prop” refers to a technique for sharing code between React components using a prop whose value is a function.

* A component with a render prop takes a function that returns a React element and calls it instead of implementing its own render logic.

```ts
<DataProvider render={data => (
    <h1>Hello {data.target}</h1>
)}>
```

## Use Render Props for Cross-Cutting Concerns

* Components are the primary unit of code reuse in React, but it’s not always obvious how to share the state or behavior that one component encapsulates to other components that need that same state.

* For example, the following component tracks the mouse position in a web app:

```ts
class MouseTracker extends React.Component {
    constructor(props) {
        super(props);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.state = { x:0, y:0 };
    }

    handleMouseMove(event) {
        this.setState({
            x: event.clientX,
            y: event.clientY
        });
    }

    render() {
        return (
            <div style={{height: '100vh'}} onMouseMove={this.handleMouseMove}>
                <h1>Move the mouse around! </h1>
                <p>
                    The current mouse position is ({this.state.x}, {this.state.y})
                </p>
            </div>
        );
    }
}
```