https://dev.to/reedbarger/the-react-cheatsheet-for-2020-real-world-examples-4hgg#writing-custom-hooks

# Writing custom hooks

Hooks were created to easily reuse behavior between components
Hooks are a more understandable pattern than previous ones for class components, such as higher-order components or render props
What's great is that we can create our own hooks according to our own projects' needs, aside from the ones we've covered that React provides:

```ts
funtion useAPI(endpoint) {
    const [value, setValue] = React.useState([]);

    React.useEffect(() => {
        getData();
    }, []);

    async function getData() {
        const response = await fetch(endpoint);
        const data = await response.json();
        setValue(data);
    }
};

function App() {
    const todos = useAPI("https://todos-dsequjaojf.now.sh/todos");

    return (
        <ul>
            {todos.map(todo => <li key={todo.id}>{todo.text}</li>)}
        </ul>
    );
}
```
