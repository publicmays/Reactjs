// function * for generator function
// Motivation
// 1. Lazy Iterators
// 2. Externally Controlled Execution

// Lazy Iterators
// function returns an infinite list of integers on demand
function* infiniteSequence() {
    var i = 0;
    while(true) {
        yield i++;
    }
}

var iterator = infiniteSequence();
while(true) {
    console.log(iterator.next()); // {value: xxxx, done: false } forever and ever
}

function* idMaker() {
    let index = 0;
    while (index < 3)
        yield index++;
}

let gen = idMaker();

console.log(gen.next()); // { value: 0, done: false }
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { done: true }

// Externally Controlled Execution
// function to pause its execution
// pass control (fate) of the remainder of the function execution to the caller

// Generator funciton does not execute when you call it
// It just creates a generator object

function* generator() {
    console.log('Execution started');
    yield 0;
    console.log('Execution resumed');
    yield 1;
    console.log('Execution resumed');
}

var iterator = generator();
console.log('Starting iteration'); // executes before anything in the generator or function body executes
console.log(iterator.next()); // { value: 0, done: false }
console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: undefined, done: true }

// function only starts execution once next is called on the generator object
// function pauses as soon as yield statement is encountered
// function resumes when next is called

// generator function is controllable by the generator object

// Example
// iterator.next(valueToInject)

function* generator() {
    var bar = yield 'foo';
    console.log(bar); // bar!
}

const iterator = generator();

// start execution until we get first yield value
const foo = iterator.next();
console.log(foo.value); // foo
// Resume execution injecting bar
const nextThing = iterator.next('bar');

// Example
// iterator.throw(error)

function* generator() {
    try {
        yield 'foo';
    }
    catch(err) {
        console.log(err.message);
    }
}

var iterator = generator();
// Start execution until we get first yield value
var foo = iterator.next();
console.log(foo.value); // foo
// Resume execution throwing an exception 'bar'
var nextThing = iterator.throw(new Error('bar'));

// Summary:
// yield allows a generator function to pause its communication and pass control to an external system
// the external system can push a value into the generator function body
// the external system can throw an exception into the generator function body