# Optimizing Performance

## Use the Production Build

![](https://reactjs.org/static/d0f767f80866431ccdec18f200ca58f1/0a47e/devtools-prod.png)

## Profiling Components with the Chrome Performance Tab

* In the development mode, you can visualize how components mount, update, and unmount, using the performance tools in supported browsers. For example:

![](https://reactjs.org/static/64d522b74fb585f1abada9801f85fa9d/1ac66/react-perf-chrome-timeline.png)

## Profiling Components with the DevTools Profiler

[Introducing the React Profiler](https://reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html)

## Virtualize Long Lists

If your application renders long lists of data (hundreds or thousands of rows), we recommended using a technique known as “windowing”. This technique only renders a small subset of your rows at any given time, and can dramatically reduce the time it takes to re-render the components as well as the number of DOM nodes created.

react-window and react-virtualized are popular windowing libraries. They provide several reusable components for displaying lists, grids, and tabular data

## Avoid Reconciliation

React builds and maintains an internal representation of the rendered UI. It includes the React elements you return from your components. This representation lets React avoid creating DOM nodes and accessing existing ones beyond necessity, as that can be slower than operations on JavaScript objects. Sometimes it is referred to as a “virtual DOM”, but it works the same way on React Native.

When a component’s props or state change, React decides whether an actual DOM update is necessary by comparing the newly returned element with the previously rendered one. When they are not equal, React will update the DOM.

Even though React only updates the changed DOM nodes, re-rendering still takes some time. In many cases it’s not a problem, but if the slowdown is noticeable, you can speed all of this up by overriding the lifecycle function shouldComponentUpdate, which is triggered before the re-rendering process starts. The default implementation of this function returns true, leaving React to perform the update:

```ts
shouldComponentUpdate(nextProps, nextState) {
    return true;
}
```

If you know that in some situations your component doesn’t need to update, you can return `false` from `shouldComponentUpdate` instead, to skip the whole rendering process, including calling `render()` on this component and below.

In most cases, instead of writing `shouldComponentUpdate()` by hand, you can inherit from `React.PureComponent`. It is equivalent to implementing `shouldComponentUpdate()` with a shallow comparison of current and previous props and state.

## `shouldComponentUpdate` In Action

Here’s a subtree of components. For each one, `SCU` indicates what `shouldComponentUpdate` returned, and `vDOMEq` indicates whether the rendered React elements were equivalent. Finally, the circle’s color indicates whether the component had to be reconciled or not.

![](https://reactjs.org/static/5ee1bdf4779af06072a17b7a0654f6db/cd039/should-component-update.png)

Since `shouldComponentUpdate` returned false for the subtree rooted at C2, React did not attempt to render C2, and thus didn’t even have to invoke `shouldComponentUpdate` on C4 and C5.

For C1 and C3, `shouldComponentUpdate` returned true, so React had to go down to the leaves and check them. For C6 `shouldComponentUpdate` returned true, and since the rendered elements weren’t equivalent React had to update the DOM.

The last interesting case is C8. React had to render this component, but since the React elements it returned were equal to the previously rendered ones, it didn’t have to update the DOM.

Note that React only had to do DOM mutations for C6, which was inevitable. For C8, it bailed out by comparing the rendered React elements, and for C2’s subtree and C7, it didn’t even have to compare the elements as we bailed out on `shouldComponentUpdate`, and render was not called.

## Examples