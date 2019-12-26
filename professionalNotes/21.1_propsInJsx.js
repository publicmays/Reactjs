// spread attributes
// spread operator to pass the whole props object
function Case1() {
    return <Greeting firstName="Kathleen" lastName="Foo" />;
}

function Case2() {
    const person = {firstName: 'Kathleen', lastName: 'Foo'};
    return <Greeting {...person} />;
}