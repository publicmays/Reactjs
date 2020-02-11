// await 
// tells js runtime to pause the execution code when used on a promise and resume only
// once (and if) the promise returned from the function is settled

// not actual code
async function foo() {
    try {
        var val = await getMeAPromise();
        console.log(val);
    } catch(err) {
        console.log('Error: ', err.message);
    }
}

const foo = wrapToReturnPromise(function* () {
    try {
        var val = yield getMeAPromise();
        console.log(val);
    } catch(err) {
        console.log('Error: ', err.message);
    }
})

// Example
function delay(milliseconds: number, count: number): Promise<number> {
    return new Promise<number>(resolve => {
        setTimeout(() => {resolve(count);}, milliseconds);
    });
}

// async funciton always returns a Promise
async function dramaticWelcome(): Promise<void> {
    console.log("Hello");
    for(let i = 0; i < 5; ++i) {
        //await is converting Promise<number> into a number
        const count: number = await delay(500, i);
        console.log(count);
    }
    console.log("World")!
}

dramaticWelcome();