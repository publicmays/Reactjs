# DOM Elements

* React implements a browser-independent DOM system for performance and cross-browser compatibility. We took the opportunity to clean up a few rough edges in browser DOM implementations.

* In React, all DOM properties and attributes (including event handlers) should be camelCased. For example, the HTML attribute tabindex corresponds to the attribute tabIndex in React. The exception is aria-* and data-* attributes, which should be lowercased. For example, you can keep aria-label as aria-label.

## Differences In Attributes

* There are a number of attributes that work differently between React and HTML:

### checked

* The checked attribute is supported by `<input>` components of type checkbox or radio. You can use it to set whether the component is checked. This is useful for building controlled components. `defaultChecked` is the uncontrolled equivalent, which sets whether the component is checked when it is first mounted.

### className

* To specify a CSS class, use the className attribute. This applies to all regular DOM and SVG elements like `<div>`, `<a>`, and others.

* If you use React with Web Components (which is uncommon), use the class attribute instead.

### htmlFor

* Since for is a reserved word in JavaScript, React elements use htmlFor instead.

### onChange

* The `onChange` event behaves as you would expect it to: whenever a form field is changed, this event is fired. We intentionally do not use the existing browser behavior because onChange is a misnomer for its behavior and React relies on this event to handle user input in real time.

### selected

* The selected attribute is supported by `<option>` components. You can use it to set whether the component is selected. This is useful for building controlled components.

### style

> Note:

* Some examples in the documentation use style for convenience, but using the style attribute as the primary means of styling elements is generally not recommended. In most cases, className should be used to reference classes defined in an external CSS stylesheet. style is most often used in React applications to add dynamically-computed styles at render time. See also FAQ: Styling and CSS.

* The style attribute accepts a JavaScript object with camelCased properties rather than a CSS string. This is consistent with the DOM style JavaScript property, is more efficient, and prevents XSS security holes. For example:

```ts
const divStyle = {
    color: 'blue',
    backgroundImage: 'url(' + imgUrl + ')',
};

function HelloWorldCOmponent() {
    return <div style={divStyle}>Hello World!</div>;
}
```

* React will automatically append a “px” suffix to certain numeric inline style properties. If you want to use units other than “px”, specify the value as a string with the desired unit. For example:

```ts
// Result style: '10px'
<div style={{height: 10}}>
    Hello World!
</div>

// Result style: '10%'
<div style={{height: '10%'}}>
    Hello World!
</div>
```

Not all style properties are converted to pixel strings though. Certain ones remain unitless (eg zoom, order, flex). A complete list of unitless properties can be seen [here](https://github.com/facebook/react/blob/4131af3e4bf52f3a003537ec95a1655147c81270/src/renderers/dom/shared/CSSProperty.js#L15-L59).

### suppressContentEditableWarning

* Normally, there is a warning when an element with children is also marked as contentEditable, because it won’t work. This attribute suppresses that warning. Don’t use this unless you are building a library like Draft.js that manages contentEditable manually.

### suppressHydrationWarning

* If you use server-side React rendering, normally there is a warning when the server and the client render different content. However, in some rare cases, it is very hard or impossible to guarantee an exact match. For example, timestamps are expected to differ on the server and on the client.

* If you set suppressHydrationWarning to true, React will not warn you about mismatches in the attributes and the content of that element. It only works one level deep, and is intended to be used as an escape hatch. Don’t overuse it.

### value

* The value attribute is supported by <input> and <textarea> components. You can use it to set the value of the component. This is useful for building controlled components. defaultValue is the uncontrolled equivalent, which sets the value of the component when it is first mounted.

## All Supported HTML Attributes