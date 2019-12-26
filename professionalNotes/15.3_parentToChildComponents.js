// pass props down to child componets

import React from 'react';

class Parent extends React.Component {
    render() {
        const variable = 5;
        return(
            <div>
                <Child message="message for child" />
                <Child message={variable} />
            </div>
        );
    }
}

class Child extends React.Component {
   render() {
       return <h1>{this.props.message}</h1> 
   }
}

export default Parent;

// <Parent /> renders 2 <Child /> components
// passing values down