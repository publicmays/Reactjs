# Profiler API

* The Profiler measures how often a React application renders and what the “cost” of rendering is. Its purpose is to help identify parts of an application that are slow and may benefit from optimizations such as memoization.

> Note:

* Profiling adds some additional overhead, so it is disabled in the production build.

* To opt into production profiling, React provides a special production build with profiling enabled. Read more about how to use this build at fb.me/react-profiling

## Usage

* A Profiler can be added anywhere in a React tree to measure the cost of rendering that part of the tree. It requires two props: an `id` (string) and an `onRender` callback (function) which React calls any time a component within the tree “commits” an update.

* For example, to profile a `Navigation` component and its descendants:

```ts
render() {
    <App>
        <Profiler id="Navigation" onRender={callback}>
            <Navigation {...props} />
        </Profiler>
        <Main {...props} />
    </App>
}
```

* Multiple Profiler components can be used to measure different parts of an application:

```ts

```