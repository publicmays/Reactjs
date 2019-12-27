// allows to retrieve a value from some collection or sequence which belongs to the obj

interface Iterator<T> {
    next(value?: any): IteratorResult<T>;
    return?(value?: any): IteratorResult<T>;
    throw?(e?: any): IteratorResult<T>;
}

interface IteratorResult<T> {
    done: boolean;
    value: T;
}

// ES6 defines iterable protocol [Symbol.iterator] symbol
class Coponent {
    constructor (public name: string) {}
}
class Frame implements Iterable<Component>{
    private pointer = 0;
    constructor(public name: string, public component: Component[]) {}
    public next(): IteratorResult<Component> {
        if (this.ointer < this.components.length) {
            return {
                done: false,
                value: this.components[this.pointer++]
            }
        } else {
            return {
                done: true, 
                value null
            }
        }
    }
    [Symbol.iterator](): IterableIterator<Component> {
        return this;
    }
}