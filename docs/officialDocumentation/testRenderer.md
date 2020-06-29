# Test Renderer

Import

```ts
import TestRenderer from 'react-test-renderer'; // ES6
```

## Overview

* This package provides a React renderer that can be used to render React components to pure JavaScript objects, without depending on the DOM or a native mobile environment.

* Essentially, this package makes it easy to grab a snapshot of the platform view hierarchy (similar to a DOM tree) rendered by a React DOM or React Native component without using a browser or jsdom.


Example:

```ts
import TestRenderer from 'react-test-renderer';

function Link(props) {
    return <a href={props.page}>{props.children}</a>;
}

const testRenderer = TestRenderer.create(
    <Link page="www.google.com/">Google</Link>
);

console.log(testRenderer.toJSON());
// { type: 'a',
//   props: { href: 'www.google.com/' },
//   children: [ 'Google' ] }
```

* You can use Jest’s snapshot testing feature to automatically save a copy of the JSON tree to a file and check in your tests that it hasn’t changed.

* You can also traverse the output to find specific nodes and make assertions about them.

```ts
import TestRenderer from 'react-test-renderer';

function MyComponent() {
    return (
        <div>
            <SubComponent foo="bar" />
            <p className="my">Hello</p>
        </div>
    )
}

function SubComponent() {
    return (
        <p className="sub">Sub</p>
    );
}

const testRenderer = TestRenderer.create(<MyComponent />);
const testInstance = testRenderer.root;

expect(testInstance.findByType(SubComponent).props.foo).toBe('bar');
expect(testInstance.findByProps({className: "Sub"}).children).toEqual(['Sub']);
```

## TestRenderer

```ts
TestRenderer.create()
TestRenderer.act()
```

## TestRenderer instance

```ts
testRenderer.toJSON()
testRenderer.toTree()
testRenderer.update()
testRenderer.unmount()
testRenderer.getInstance()
testRenderer.root
```

## TestInstance

```ts
testInstance.find()
testInstance.findByType()
testInstance.findByProps()
testInstance.findAll()
testInstance.findAllByType()
testInstance.findAllByProps()
testInstance.instance
testInstance.type
testInstance.props
testInstance.parent
testInstance.children
```

## Reference

## TestRenderer.create()

```ts
TestRenderer.create(element, options);
```

* Create a TestRenderer instance with the passed React element. It doesn’t use the real DOM, but it still fully renders the component tree into memory so you can make assertions about it. Returns a TestRenderer instance.

## TestRenderer.act()

```ts
TestRenderer.act(callback)
```

* Similar to the act() helper from react-dom/test-utils, TestRenderer.act prepares a component for assertions. Use this version of act() to wrap calls to TestRenderer.create and testRenderer.update.

```ts
import { creat, act } from 'react-test-renderer';
import App from './app.js'; // The component being tested

// render the component
let root;
act(() => {
    root = create(<App value={1}/>)
});

// make assertions on root
expect(root.toJSON()).toMatchSnapshot();

// update with some different props
act(() => {
    root.update(<App value={2} />);
})

// make assertions on root
expect(root.toJSON()).toMatchSnapshot();
```

## testRenderer.toJSON()

```ts
testRenderer.toJSON()
```

* Return an object representing the rendered tree. This tree only contains the platform-specific nodes like <div> or <View> and their props, but doesn’t contain any user-written components. This is handy for snapshot testing.

## testRenderer.toTree()

```ts
testRenderer.toTree()
```

* Return an object representing the rendered tree. The representation is more detailed than the one provided by toJSON(), and includes the user-written components. You probably don’t need this method unless you’re writing your own assertion library on top of the test renderer.

## testRenderer.update()

```ts
testRenderer.update(element)
```

* Re-render the in-memory tree with a new root element. This simulates a React update at the root. If the new element has the same type and key as the previous element, the tree will be updated; otherwise, it will re-mount a new tree.

## testRenderer.unmount()

```ts
testRenderer.unmount()
```

* Unmount the in-memory tree, triggering the appropriate lifecycle events

## testRenderer.getInstance()

```ts
testRenderer.getInstance()
```

* Return the instance corresponding to the root element, if available. This will not work if the root element is a function component because they don’t have instances.

## testRenderer.root

```ts
testRenderer.root
```

* Returns the root “test instance” object that is useful for making assertions about specific nodes in the tree. You can use it to find other “test instances” deeper below.

## testInstance.find()

```ts
testInstance.find(test)
```

* Find a single descendant test instance for which test(testInstance) returns true. If test(testInstance) does not return true for exactly one test instance, it will throw an error.

