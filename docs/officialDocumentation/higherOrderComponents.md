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
class BlogPost extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            blogPost: DataSource.getBlogPost(props.id);
        }
    }

    componentDidMount() {
        DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
        DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
        this.setState({
            blogPost: DataSource.getBlogPost(this.props.id);
        });
    }

    render() {
        return(
            <TextBlock text={this.state.blogPost} />
        );
    }
}
```

* CommentList and BlogPost aren’t identical — they call different methods on DataSource, and they render different output. 
* But much of their implementation is the same:

1. On mount, add a change listener to DataSource.
1. Inside the listener, call setState whenever the data source changes.
1. On unmount, remove the change listener.

* You can imagine that in a large app, this same pattern of subscribing to DataSource and calling setState will occur over and over again. 
* We want an abstraction that allows us to define this logic in a single place and share it across many components. This is where higher-order components excel.
* We can write a function that creates components, like CommentList and BlogPost, that subscribe to DataSource. 
* The function will accept as one of its arguments a child component that receives the subscribed data as a prop. 
* Let’s call the function withSubscription:

```ts
const CommentListWithSubscription = withSubscription(
    CommentList,
    (DataSource) => getComments());

const BlogPostWithSubscription = withSubscription(
    BlogPost,
    (DataSource, props) => DataSource.getBlogPost(props.id));
```

* The first parameter is the wrapped component. 
* The second parameter retrieves the data we’re interested in, given a DataSource and the current props.

* When CommentListWithSubscription and BlogPostWithSubscription are rendered, CommentList and BlogPost will be passed a data prop with the most current data retrieved from DataSource:

```ts
// This function takes a component...
function withSubscription(WrappedComponent, selectData) {
    // ... and returns another component ...
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.handleChange = this.handleChange.bind(this);
            this.state = {
                data: selectData(DataSource, props)
            }
        }

        componentDidMount() {
            // ... that takes care of the subscription ...
            DataSource.addChangeListener(this.handleChange);
        }

        componentWillUnmount() {
            DataSource.removeChangeListener(this.handleChange);
        }

        handleChange() {
            this.setState({
                data: selectData(DataSource, this.props)
            });
        }

        render() {
            // .. and renders the wrapped component with the fresh data!
            // Notice that we pass through any additional props
            return (
                <WrappedComponent data={this.state.data} {...this.props} />
            );
        }
    }
}
```

* HOC composes the original component by wrapping it in a container component. 
* A HOC is a pure function with zero side-effects.
* The wrapped component receives all the props of the container, along with a new prop, data, which it uses to render its output. 
* The HOC isn’t concerned with how or why the data is used, and the wrapped component isn’t concerned with where the data came from.
* Because `withSubscription` is a normal function, you can add as many or as few arguments as you like. 
* For example, you may want to make the name of the data prop configurable, to further isolate the HOC from the wrapped component. 
* Or you could accept an argument that configures `shouldComponentUpdate`, or one that configures the data source. 
* These are all possible because the HOC has full control over how the component is defined.
* Like components, the contract between `withSubscription` and the wrapped component is entirely props-based. 
* This makes it easy to swap one HOC for a different one, as long as they provide the same props to the wrapped component.

## Don’t Mutate the Original Component. Use Composition.

* Resist the temptation to modify a component’s prototype (or otherwise mutate it) inside a HOC.

```ts
function logProps(InputComponent) {
    InputComponent.prototype.componentDidUpdate = function(prevProps) {
        console.log('Current props:', this.props);
        console.log('Previous props:', prevProps);
    };

    // The fact that we're returning the original input is a hint that it has been mutated.
    return InputComponent;
}

// EnhancedComponent will log whenever props are received
const EnhancedComponent = logProps(InputComponent);
```