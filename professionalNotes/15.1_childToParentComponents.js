// pass a function as a prop from the parent component to the child component
// child component calls that function

import React from 'react';

class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {count: 0};
        this.outputEvent = this.outputEvent.bind(this);
    }

    outputEvent(event) {
        // the event context comes from the Child
        this.setState( {count: this.state.count++ });
    }

    render() {
        const variable = 5;
        return (
            <div>
                Count : {this.state.count}
                <Child clickHandler={this.outputEvent} />
            </div>
        );
    }
}

class Child extends React.Component {
    render() {
        return(
            <button onClick={this.props.clickHandler}>
                Add one more
            </button>
        );
    }
}

export default Parent;

// parent's outputEvent is invoked by Child's button onClick event