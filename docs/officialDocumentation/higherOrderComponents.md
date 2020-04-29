# Higher-Order Components

* A higher-order component (HOC) is an advanced technique in React for reusing component logic. 
* HOCs are not part of the React API, per se. They are a pattern that emerges from React’s compositional nature.
* **Higher-order component is a function that takes a component and returns a new component.**

```ts
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

## Use HOCs For Cross-Cutting Concerns

> Note:
> We previously recommended mixins as a way to handle cross-cutting concerns. 
> Mixins == Bad

* Ex. CommentList component that subscribes to an external data source to render a list of comments:

```ts
class CommentList extends React.Component {
    constructor() {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            // "DataSource" is some global data source
            comments: DataSource.getComments()
        };
    }

    componentDidMount() {
        // Subscribe to changes
        DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
        // Clean up listener
        DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
        // Update component state whenever the data sources changes
        this.setState({
            comments: DataSource.getComments();
        });
    }

    render() {
        return(
            <div>
                {this.state.comments.map((comment) => (
                    <Comment comment={comment} key={comment.id}>
                ))}
            </div>
        );
    }
}
```

* Later, you write a component for subscribing to a single blog post, which follows a similar pattern:

```ts

```