import fs = require('fs');

function loadJSON(filename: string, cb: (error: Error) => void) {
    fs.readFile(filename, function(err, data) {
        if (err) return cb(err);

        try {
            var parsed = JSON.parse(data);
        } 
        catch(err) {
            return cb(err);
        }

        return cb(null, parsed);
    });
}

// Converting this into a promise

function readFileAsync(filename: string): Promise<any> {
    return new Promise((resolve, reject) => {
        fs.readFile(filename, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
}

function loadJSONAsync(filename: string): Promise<any> {
    return readFileAsync(filename) // use the function we just wrote
        .then(function(res) {
            return JSON.parse(res);
        })
}

// good json file
loadJSONAsync('good.json')
    .then(function(val) { console.log(val); })
    .catch(function(err) {
        console.log('good.json error', err.message); // never called
    })

// non existent json file
    .then(function() {
        return loadJSONAsync('absent.json');
    })
    .then(function(val) { console.log(val) }) // never called
    .catch(function(err) {
        console.log('absent.json error', err.message);
    })

// invalid json file
    .then(function() {
        return loadJSONAsync('invalid.json');
    })
    .then(function(val) {console.log(val); }) // never called
    .catch(function(err) {
        console.log('bad.json error', err.message);
    })