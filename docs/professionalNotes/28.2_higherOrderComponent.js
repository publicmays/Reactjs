// hocLogger.js

export default function hocLogger(Component) {
    return class extends React.Component {
        componentDidMount() {
            console.log('Hey, we are mounted!');
        }
        render() {
            return <Component {...this.props} />;
        }
    }
}

// use this HOC in your code

// MyLoggedComponent.js
import React from "react";
import {hocLogger} from "./hocLogger";

export class MyLoggedComponent extends React.Component {
    render() {
        return (
            <div>
                This component gets logged to console on each mount.
            </div>);
    }
}

export default hocLogger(MyLoggedComponent);