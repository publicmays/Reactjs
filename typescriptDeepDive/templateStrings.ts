// Motivation backticks (`)
// * String Interpolation
// * Multiline Strings
// * Tagged Templates

// String Interpolation
var lyrics = 'Never gonna give you up';
var html = `<div>${lyrics}</div>`

console.log(`1 and 1 make ${1+1}`);

// Mutliline Strings
var lyrics = `Never gonna give you up
Never gonna let you down`;

// Tagged Templates
// all static literals are passed in an array for the first argument
// all values of placeholders expressions are passed in as the remaining arguments

// ex. escpaes html from all placeholders
var say = "a bird in hand > two in the bush";
var html = htmlEscape `<div> I would just like to say: ${say}</div>`;

// a sample tag function
function htmlEscape(literals, ...placeholders) {
    let result = "";

    // interleave the literals with the placeholders
    for (let i = 0; i < placeholders.length; ++i) {
        result += literals[i];
        result += placeholders[i]
            .replace(/&/g, '$amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
    }

    // add last literal
    result += literals[literals.length - 1];
    return result;
}