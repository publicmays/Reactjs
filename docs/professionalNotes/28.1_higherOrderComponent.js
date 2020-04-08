// HOC is a react application design pattern to enhance components with resuable code
// enable to add functionality & behaviors to existing component classes
// pure js function that accepts a component as it's argument and returns a new component 
// with the extended functionality

// AuthenticatedComponent.js

import React from "react";

export function requireAuthentication(Component) {
    return class AuthenticatedComponent extends React.Component {
        // this.props.isAuthenticated has to be set from your
        // application logic or use react-redux to retrieve it from global

        isAuthenticated() {
            return this.props.isAuthenticated;
        }

        render() {
            const loginErrorMessage = (
                <div>
                    Please <a href="/login">login</a> in order to view this part of the application.
                </div>
            );

            return (<div>
                {this.isAuthenticated === true ? <Component {...this.props} /> : loginErrorMessage }
            </div>);
        }
    };
}

// then we use HOC in our components that should be hidden from anonymous users

// MyPrivateComponent.js

import React from "react";
import {requireAuthentication} from "./AuthenticatedComponent";

export class MyPrivateComponent extends React.Component {
    render() {
        return(<div>
            My secret search, that is only viewable by authenticated users.
        </div>);
    }
}

export default requireAuthentication(MyPrivateComponent);