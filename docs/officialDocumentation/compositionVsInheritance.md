# Composition vs Inheritance

* React has a powerful composition model, and we recommend using composition instead of inheritance to reuse code between components.

## Containment

* Some components don’t know their children ahead of time. This is especially common for components like `Sidebar` or `Dialog` that represent generic “boxes”.
* We recommend that such components use the special `children` prop to pass children elements directly into their output:

```ts
function FancyBorder(props) {
    return(
        <div className={'FancyBorder FancyBorder-' + props.color}>
            {props.children}
        </div>
    );
}
```

* This lets other components pass arbitrary children to them by nesting the JSX:

```ts

```