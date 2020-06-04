# React Top-Level API

* React is the entry point to the React library. 
* If you load React from a `<script>` tag, these top-level APIs are available on the React global. 
* If you use ES6 with npm, you can write `import React from 'react'`. 
* If you use ES5 with npm, you can write `var React = require('react')`.

## Overview

### Components

* React components let you split the UI into independent, reusable pieces, and think about each piece in isolation. React components can be defined by subclassing React.Component or React.PureComponent.

* `React.Component`
* `React.PureComponent`

* React components can also be defined as functions which can be wrapped:

* `React.memo`

### Creating React Elements