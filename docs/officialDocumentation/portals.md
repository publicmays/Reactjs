# Portals

* Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.

```ts
ReactDOM.createPortal(child, container)
```

1. `(child)` is any renderable React child, such as an element, string, or fragment. 
1. `(container)` is a DOM element.

## Usage

* Normally, when you return an element from a component’s render method, it’s mounted into the DOM as a child of the nearest parent node:

```ts
render() {
    // React mounts a new div and renders the children into it
    return (
        <div>
            {this.props.children}
        </div>
    );
}
```

* However, sometimes it’s useful to insert a child into a different location in the DOM:

```ts
render() {
    // React does *not* create a new div. 
    // It renders the children into `domNode`.
    // `domNode` is any valid DOM node, 
    // regardless of its location in the DOM
    return ReactDOM.createPortal(
        this.props.children,
        domNode
    );
}
```

* A typical use case for portals is when a parent component has an overflow: hidden or z-index style, but you need the child to visually “break out” of its container. For example, dialogs, hovercards, and tooltips.

> Note:

* When working with portals, remember that managing keyboard focus becomes very important.

* For modal dialogs, ensure that everyone can interact with them by following the WAI-ARIA Modal Authoring Practices.

Code Pen:

```ts
// These two containers are siblings in the DOM
const appRoot = document.getElementById('app-root');
const modalRoot = document.getElementById('modal-root');

// Let's create a Modal component that is an abstraction around
// the portal API.
class Modal extends React.Component {
    constructor(props) {
        super(props);
        // Create a div that we'll render the modal into. Because each
        // Modal component has its own element, we can render multiple
        // modal components into the modal container.
        this.el = document.createElement('div');
    }

    componentDidMount() {
        // Append the element into the DOM on mount. We'll render
        // into the modal container element (see the HTML tab).
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        // Remove the element from the DOM when we unmount
        modalRoot.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.el
        );
        // Use a portal to render the children into the element
        // Arg 1: Any valid React child: JSX, strings, arrays, etc.
        // Arg 2: A DOM element
    }
}

// The Modal component is a normal React component, so we can
// render it wherever we like without needing to know that it's
// implemented with portals.
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showModal: false};

        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);
    }

    handleShow() {
        this.setState({
            showModal: true
        });
    }

    handleHide() {
        this.setState({
            showModal: false
        });
    }

    render() {
        // Show a Modal on click.
        const modal = this.state.showModal 
            ? (
                <Modal>
                    <div>
                        With a portal, we can render content into a different
                        part of the DOM, as if it were any other React child.
                    </div>
                    This is being rendered inside the #modal-container div.
                    <button onClick={this.handleHide}>
                        Hide modal
                    </button>
                </Modal>
            )
            : null;
        return (
            <div className="app">
                This div has overflow: hidden.
                <button onClick={this.handleShow}>
                    Show modal
                </button>
                {modal}
            </div>
        );
    }
}

ReactDOM.render(<App />, appRoot);
```

## Event Bubbling Through Portals