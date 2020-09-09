# Components

React.Component encapsulates State and Lifecycle.

There are few types o the components available in React:

- Class Component - the component which extends React.Component and uses OOP paradigms to handle state, properties, actions and manage component lifecycle. React component re-renders if the parent component got re-rendered even if no props were changed.
- Pure Component - the React.PureComponent is similar to the React.Component. The difference between them is that React.Component doesn’t implement shouldComponentUpdate(), but React.PureComponent implements it with a shallow prop and state comparison.

* Function Component - the React.FunctionComponent is the component which takes props and renders them based on internal component logic.
* Method Component - the Method Component is the component which is defined as a method of class or as a function.

## Regular components no props change

If there is no any additional work on the child components done the Class and Function children components will re-render even if no properties have been changed.

As Pure component implements shallow comparison of the props out of the box, it won't re-render.

## Regular components props change

If any prop has been changed on any of the component type: Class, Pure, Function all of them will re-render and this is expected behavior.

## Memoized components no props change

Components should be "memoized" to prevent re-rendering when no props have been changed.

The "memoziation" techniques described in the corresponding section of each component type.

The only Pure component has this functionality out of the box and no additional work for such component required.

## Memoized components props change

If any prop has been changed on any of the component type: Class, Pure, Function all of them will re-render even if they are "memoized" and this is expected behavior.
