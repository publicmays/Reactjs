// Promise.all wait fo n # of promises to complete
// input: n promises
// output: array of n resolved values

// an async function to simulate loading an item from some server
function loadItem(id: number): Promise<any> {
    return new Promise((resolve) => {
        console.log('loading item', id);
        setTimeout(() => {
            // simulate server delay
            resolve({id: id});
        }, 1000)
    });
}

// Chaining
let item1, item2;
loadItem(1)
    .then((res) => {
        item1 = res;
        return loadItem(2);
    })
    .then((res) => {
        item2 = res;
        console.log('done');
    }); // overall time will be around 2s

// Parallel
Promise.all([loadItem(1), loadItem(2)])
    .then((res) => {
        [item1, item2] = res;
        console.log('done');
    }); // overall time will be around 1s

// Promise.race - run a series of async tasks 
// but you get all you need as long as one of these tasks finishes

var task1 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 1000, 'one');
});

var task2 = new Promise(function(resolve, reject) {
    setTimeout(resolve, 2000, 'two');
});

Promise.race([task1, task2]).then(function(value) {
    console.log(value); // 'one'
    // Both resolve, but task1 resolves faster
})

// converting callback functions to promise
// convert setTimeout into a promisified delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// NodeJS does this
// node style function => promise returning function

/** Sample Usage **/
import fs = require('fs');
import util = require('util');
const readFile = util.promisify1(fs.readFile);