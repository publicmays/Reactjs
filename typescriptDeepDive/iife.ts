// Immediately-Invoked Function Expression
// Inheritance, typescript captures the base class as a variable _super

(function() {
    return Point;
})();

(function() { /*body*/ })();

// let in closures
var funcs = [];
for (var i = 0; i < 3; i++) {
    funcs.push(function() {
        console.log(i);
    })
}

// call them
for(var j = 0; j < 3; j++) {
    funcs[j]();
}

// surprisingly 0,1,2,3

var funcs = [];
for (var i = 0; i < 3; i++) {
    (function() {
        var local = i;
        funcs.push(function() {
            console.log(i);
        })
    })();
}

// call them
for(var j = 0; j < 3; j++) {
    funcs[j]();
}

// here the functions close over (closure) the local variable

// equialent
for(let i = 0; i < 3; i++)