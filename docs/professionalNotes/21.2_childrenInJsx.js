// javascript expressions can be passed as children by enclosing with {}

// equivalent
<MyComponent>foo</MyComponent> 
<MyComponent> {'foo'}</MyComponent>

const Item = ({message}) => (
    <li> {message} </li>
);

const TodoList = () => {
    const todos = ['finish doc', 'submit review', 'wait stack overflow review'];
    return (
        <ul>
            {todos.map(message => (<Item key={message} message={message}/>))}
        </ul>
    );
}

// functions as children
const ListOfTenThings = () => (
    <Repeat numTimes={10}>
        {(index) => <div key={index}>This is item {index} in list</div>}
    </Repeat>
);

// Calls the children callback numTimes to produce a repeated component
const Repeat = ({numTimes, children}) => {
    let items=[];
    for(let i = 0; i < numTimes; ++i) {
        items.push(children(i));
    }
    return <div>{items}</div>
};