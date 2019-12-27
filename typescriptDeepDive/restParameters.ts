// denoted by ...argumentName for the last argument
// accept multiple arguments in your function 
// & get them as an array

function iTakeItAll(first, second, ...allOthers) {
    console.log(allOthers);
}

iTakeItAll('foo', 'bar'); //[]
iTakeItAll('foo', 'bar', 'bas', 'qux'); // ['bas', 'qux']