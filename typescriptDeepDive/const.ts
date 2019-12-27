// const declarations must be initialized
const foo; // error

// const is block scoped like with `let`

// allows sub properties of objects to be mutated
const foo = {bar: 123};
foo.bar = 456; // Allowed!
console.log(foo); // {bar: 456}