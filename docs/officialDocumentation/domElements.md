# DOM Elements

* React implements a browser-independent DOM system for performance and cross-browser compatibility. We took the opportunity to clean up a few rough edges in browser DOM implementations.

* In React, all DOM properties and attributes (including event handlers) should be camelCased. For example, the HTML attribute tabindex corresponds to the attribute tabIndex in React. The exception is aria-* and data-* attributes, which should be lowercased. For example, you can keep aria-label as aria-label.

## Differences In Attributes

* There are a number of attributes that work differently between React and HTML:

### checked

* The checked attribute is supported by `<input>` components of type checkbox or radio. You can use it to set whether the component is checked. This is useful for building controlled components. `defaultChecked` is the uncontrolled equivalent, which sets whether the component is checked when it is first mounted.

### className

* To specify a CSS class, use the className attribute. This applies to all regular DOM and SVG elements like <div>, <a>, and others.

* If you use React with Web Components (which is uncommon), use the class attribute instead.

### htmlFor

* Since for is a reserved word in JavaScript, React elements use htmlFor instead.

### onChange

* The `onChange` event behaves as you would expect it to: whenever a form field is changed, this event is fired. We intentionally do not use the existing browser behavior because onChange is a misnomer for its behavior and React relies on this event to handle user input in real time.

### selected

* The selected attribute is supported by `<option>` components. You can use it to set whether the component is selected. This is useful for building controlled components.

