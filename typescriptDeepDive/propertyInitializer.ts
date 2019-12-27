// supported by Typescript from ES7 
// initialize any member of the class outside the class constructor

class Foo {
    members = []; // initialize directly
    add(x) {
        this.members.push(x);
    }
}