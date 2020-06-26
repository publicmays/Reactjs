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

