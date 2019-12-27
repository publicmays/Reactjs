// object destructuring

var rect = {x: 0, y: 10, width: 15, height: 20};

// destructuring assignment
var {x, y, width, height} = rect;
console.log(x, y, width, height); // 0, 10, 15, 20

rect.x = 10;
({x, y, width, height} = rect); // assign to existing variables using outer parentheses

console.log(x, y, width, height); // 10, 10, 15, 20

// structure
const obj = {"some property": "some value"};

// destructure
const {"some property": someProperty} = obj;
console.log(someProperty === "some value"); // true

// {"some property": "some value"} = {"some property": someProperty}


var foo = { bar: {bas: 123} };
var {bar: {bas}} = foo; // Effectively `var bas = foo.bar.bas;`

// destructuring with rest

var {w, x, ...remaining} = {w: 1, x: 2, y: 3, z: 4};
console.log(w, x, remaining); // 1, 2, {y:3, z:4}

function goto(point2D: {x: number, y:number}) {

}

const point3D = {x:1, y:2, z:3 };
const {z, ...point2D} = point3D;
goto(point2D);

// array destructuring

// how to swap 2 var w/o using 3rd one?
var x = 1, y = 2;
[x,y] = [y,x];
console.log(x, y); // 2, 1

// with ignores
var [x, , ...remaining] = [1,2,3,4];
console.log(x, remaining); // 1, [3,4]

// spread
function foo(x, y, z) { }
var args = [0, 1, 2];
foo(...args);

// array assignment
var list = [1,2];
list = [...list, 3, 4];
console.log(list); // [1, 2, 3, 4]