import React from 'react'

class App extends React.Component {
    constructor() {
        super()
        this.state = {someData: null}
    }
    componentDidMount() {
        var request = new XMLHttpRequest();
        request.open('GET', '/my/url', true);

        request.onload = () => {
            if (request.status >= 200 && request.status < 400) {
                this.setState({someData: Response.repsonseText})
            } else {
                // possibly handle error by changing state
            }
        };

        request.onerror = () => {
            // there was a connection error of some sort
            // possibly handle the error by changing your state
        };

        request.send();
    }

    render() {
        return (
            <div> {this.state.someData || 'waiting for response...'} </div>
        );
    }
}

React.render(<App />, document.getElementById('root'))