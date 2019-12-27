// promise can be pending, fulfilled, or rejected
// fulfilled with a value
// rejected with a reason

const promise = new Promise((resolve, reject)=>{
    // the resolve / reject functions control the fate of promise
});

// promise fate can be subscripted to using 
// .then if resolved
// .catch if rejected

const promise = new Promise((resolve, reject) => {
    resolve(123);
});
promise.then((res)=> {
    console.log('I get called:', res === 123); // I get called, true
});
promise.catch((err)=> {
    // This never gets called
});

const promise = new Promise((resolve, reject) => {
    reject(new Error("Something awful happened"));
});
promise.then((res) => {
    // this is never called
});
promise.catch((err)=> {
    console.log('I get called:', err.message); // I get called: 'Something awful happened'
})

// Tip: Promise shortcuts
// Quickly creating an already resolved promise: Promise.resolve(result)
// Quickly creating an already rejected promise: Promise.reject(error)

// Chaining
Promise.resolve(123)
    .then((res)=> {
        console.log(res); // 123
        return 456;
    })
    .then((res => {
        console.log(res); // 456
        return Promise.resolve(123); // notice that we are returning a Promise
    }))
    .then((res => {
        console.log(res); // 123: notice this `then` is called with the resolved value
        return 123;
    }))
    .catch((err) => {
        console.log(err.message);
    });

// the `catch` returns a new promise

// Create a rejected promise
Promise.reject(new Error('something bad happened'))
    .then((res) => {
        console.log(res); // not called
        return 456;
    })
    .catch((err) => {
        console.log(err.message); // something bad happened
        return 123;
    })
    .then((res) => {
        console.log(res); // 123
    })

Promise.resolve(123)
    .then((res)=> {
        throw new Error('something ad happened'); // throws a synchronous error
        return 456;
    })
    .then((res)=> {
        console.log(res);   // never called
        return Promise.resolve(789);
    })
    .catch((err) => {
        console.log(err.message); // something bad happened
    })
    
// errors jump to the tailing `catch` and skip any middle `then` calls
// synchronous errors also get caught by any tailing catch

Promise.resolve(123)
    .then((res) => {
        // res is inferred to be of type `number`
        return true;
    })
    .then((res) => {
        // res is inferred to be of type `boolean`
    });

function iReturnPromiseAfter1Second(): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => resolve("Hello World"), 1000)
    });
}

Promise.resolve(123)
    .then((res) => {
        // res is inferred to be of type `number`
        return iReturnPromiseAfter1Second(); // We are returning `Promise<string>`
    })
    .then((res) => {
        // res is inferred to be of type `string`
        console.log(res); // Hello world!
    });

    