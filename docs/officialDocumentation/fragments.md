# Fragments

* Common pattern in React is for a component to return multiple elements. 
* Fragments let you group a list of children without adding extra nodes to the DOM.

```ts
render() {
    return(
        <React.Fragment>
            <ChildA />
            <ChildB />
            <ChildC />
        </React.Fragment>
    );
}
```

## Motivation

* A common pattern is for a component to return a list of children. Take this example React snippet:

```ts
class Table extends React.Component {
    render() {
        return (
            <table>
                <tr>
                    <Columns />
                </tr>
            </table>
        );
    }
}
```

* `<Columns />` would need to return multiple `<td>` elements in order for the rendered HTML to be valid. 
* If a parent div was used inside the render() of `<Columns />`, then the resulting HTML will be invalid.

```ts
class Columns extends React.Component {
    render() {
        return(
            <div>
                <td>Hello</td>
                <td>World</td>
            </div>
        );
    }
}
```

* results in a `<Table />` output of:

```ts
<table>
    <tr>
        <div>
            <td>Hello</td>
            <td>World</td>
        </div>
    </tr>
</table>
```

* Fragments solve this problem.

## Usage

```ts
class Columns extends React.Component {
    render() {
        return (
            <React.Fragment>
                <td>Hello</td>
                <td>World</td>
            </React.Fragment>
        );
    }
}
```

* which results in a correct <Table /> output of:

```ts
<table>
    <tr>
        <td>Hello</td>
        <td>World</td>
    </tr>
</table>
```

## Short Syntax

* You can use `<></>` the same way you’d use any other element except that it doesn’t support keys or attributes.

```ts
class Columns extends React.Component {
    render() {
        return (
            <>
                <td>Hello</td>
                <td>World</td>
            </>
        );
    }
}
```

## Keyed Fragments

* Fragments declared with the explicit `<React.Fragment>` syntax may have keys. 
* A use case for this is mapping a collection to an array of fragments — for example, to create a description list:
* `key` is the only attribute that can be passed to Fragment

```ts
function Glossary(props) {
    return(
        <dl>
            {props.items.map(
                item => (
                    // Without the `key`, React will fire a key warning
                    <React.Fragment key={item.id}>
                        <dt>{item.term}</dt>
                        <dd>{item.description}</dd>
                    </React.Fragment>
                )
            )}
        </dl>
    );
}
```