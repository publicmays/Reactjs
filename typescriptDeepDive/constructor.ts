// typescript shorthand where you can prefix the member with an access modifier 
// and it is automatically declared on the class and copied from the constructor

class Foo {
    x: number;
    constructor(x: number) {
        this.x = x;
    }
}

// equivalent to

class Foo {
    constructor(public x:number) {

    }
}

