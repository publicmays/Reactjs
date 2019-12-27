// fat arrows fix it by capturing meaning of this from the surrounding concept

function Person(age) {
    this.age = age;
    this.growOld = function() {
        this.age++;
    }
}
var person = new Person(1);
setTimeout(person.growOld, 1000);
setTimeout(function() {console.log(person.age);}, 2000); // 1, should have been 2

// change this part from
this.growOld = function() {
    this.age++;
}
// to
this.growOld = () => {
    this.age++;
}

// this is captured by the arrow function from outisde the function body, equivalent to
function Person(age) {
    this.age = age;
    var _this = this; // capture this
    this.growOld = function() {
        _this.age++; // use captured this
    }
}
var person = new Person(1);
setTimeout(person.growOld, 1000);
setTimeout(function() {console.log(person.age);}, 2000); // 2

// put this all together to combine classes

class Person {
    constructor(public age: number) {}
    growOld = () => {
        this.age++;
    }
}

var person = new Person(1);
setTimeout(person.growOld, 1000);
setTimeout(function() {console.log(person.age);}, 2000);

// Tip: only need to use fat arrow if you're going to give the function to someone else to call

var growOld = person.growOld;
// then later someone else calls it
growOld();

// if you call it yourself
person.growOld();
// then this is going to be the correct calling context (Person)

// Tip: Danger - if you want this to be the calling context do not use arrow function
// using arguments - no fat arrow
// documentation mentions functions on this - no fat arrow

// Tip: Arrow functions & inheritance
// there is only one `this`, it cannot participate in call to `super` 

class Adder {
    constructor(public a: number) {}
    // this function is now safe to pass around
    add = (b: number): number => {
        return this.a + b;
    }
}

class ExtendedAdder extends Adder {
    // create a copy of parent before creating our own
    private superAdd = this.add;
    // Now create our override
    add = (b: number): number => {
        return this.superAdd(b);
    }
}

// Tip: Quick object return

// WRONG
var foo = () => {
    bar: 123
};

// CORRECT
var foo = () => ({
    bar: 123
});