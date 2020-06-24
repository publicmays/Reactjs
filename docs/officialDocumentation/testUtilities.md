# Test Utilities

* Importing

```ts
import ReactTestUtils from 'react-dom/test-utils'; // ES6
```

## Overview

* ReactTestUtils makes it easy to test React components in the testing framework of your choice. At Facebook we use Jest for painless JavaScript testing.

```ts
act()
mockComponent()
isElement()
isElementOfType()
isDOMComponent()
isCompositeComponent()
isCompositeComponentWithType()
findAllInRenderedTree()
scryRenderedDOMComponentsWithClass()
findRenderedDOMComponentWithClass()
scryRenderedDOMComponentsWithTag()
findRenderedDOMComponentWithTag()
scryRenderedComponentsWithType()
findRenderedComponentWithType()
renderIntoDocument()
Simulate
```

## Reference

### act()

* To prepare a component for assertions, wrap the code rendering it and performing updates inside an act() call. This makes your test run closer to how React works in the browser.

> Note

* If you use react-test-renderer, it also provides an act export that behaves the same way.

* For example, let’s say we have this Counter component:

```ts
class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {count: 0};
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        document.title = `You clicked ${this.state.count} times`;
    }

    componentDidUpdate() {
        document.title = `You clicked ${this.state.count} times`;
    }
    handleClick() {
        this.setState(state => ({
            count: state.count + 1,
        }));
    }
    render() {
        return (
            <div>
                <p>You clicked {this.state.count} times</p>
                <button onClick={this.handleClick}>
                    Click me
                </button>
            </div>
        );
    }
}
```

* Here is how we can test it:

```ts
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Counter from './Counter';

let container;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    document.body.removeChild(container);
    container = null;
});

it('can render and update a counter', () => {
    // Test first render and componentDidMount
    act(() => {
        ReactDOM.render(<Counter />, container);
    });
    const button = container.querySelector('button');
    const label = container.querySelector('p');
    expect(label.textContent).toBe('You clicked 0 times');
    expect(document.title).toBe('You clicked 0 times');

    // Test second render and componentDidUpdate
    act(() => {
        button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
        expect(label.textContent).toBe('You clicked 1 times');
        expect(document.title).toBe('You clicked 1 times');
    });
});
```

* Don’t forget that dispatching DOM events only works when the DOM container is added to the document. You can use a library like React Testing Library to reduce the boilerplate code.

* The recipes document contains more details on how act() behaves, with examples and usage.

### isElement()

```ts
isElement(element)
```

* Returns true if element is any React element.

### isElementOfType()

```ts
isElementOfType(
    element,
    componentClass
)
```

* Returns true if element is a React element whose type is of a React componentClass.

### isDOMComponent()

```ts
isDOMComponent(instance)
```

* Returns true if instance is a DOM component (such as a `<div>` or `<span>`).

### isCompositeComponent()

```ts
isCompositeComponent(instance)
```

* Returns true if instance is a user-defined component, such as a class or a function.

### isCompositeComponentWithType()

```ts
isCompositeComponentWithType(
    instance,
    componentClass
)
```

* Returns true if instance is a component whose type is of a React componentClass.

### findAllInRenderedTree()

```ts
findAllInRenderedTree(
    tree,
    test
)
```

* Traverse all components in tree and accumulate all components where test(component) is true. This is not that useful on its own, but it’s used as a primitive for other test utils.

### scryRenderedDOMComponentsWithClass()

```ts
scryRenderedDOMComponentsWithClass(
    tree,
    className
)
```

* Finds all DOM elements of components in the rendered tree that are DOM components with the class name matching className.

### findRenderedDOMComponentWithClass()

```ts
findRenderedDOMComponentWithClass(
    tree,
    className
)
```

* Like scryRenderedDOMComponentsWithClass() but expects there to be one result, and returns that one result, or throws exception if there is any other number of matches besides one.

### scryRenderedDOMComponentsWithTag()

```ts
scryRenderedDOMComponentsWithTag(
    tree,
    tagName
)
```

* Finds all DOM elements of components in the rendered tree that are DOM components with the tag name matching tagName.

### findRenderedDOMComponentWithTag()

```ts
findRenderedDOMComponentWithTag(
    tree,
    tagName
)
```

* Like scryRenderedDOMComponentsWithTag() but expects there to be one result, and returns that one result, or throws exception if there is any other number of matches besides one.

### scryRenderedComponentsWithType()

```ts
scryRenderedComponentsWithType(
    tree,
    componentClass
)
```

* Finds all instances of components with type equal to componentClass.

### findRenderedComponentWithType()

```ts
findRenderedComponentWithType(
    tree,
    componentClass
)
```

* Same as scryRenderedComponentsWithType() but expects there to be one result and returns that one result, or throws exception if there is any other number of matches besides one.

### renderIntoDocument()

```ts
renderIntoDocument(element)
```

* Render a React element into a detached DOM node in the document. This function requires a DOM. It is effectively equivalent to:

```ts
const domContainer = document.createElement('div');
ReactDOM.render(element, domContainer);
```

> Note:

* You will need to have window, window.document and window.document.createElement globally available before you import React. Otherwise React will think it can’t access the DOM and methods like setState won’t work.

## Other Utilities
