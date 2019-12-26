import React from 'react'
import request from 'superagent'

class App extends React.Component {
    constructor() {
     super()
     this.state = {}   
    }

    componentDidMount() {
        request
            .get('/search')
            .query({query: 'Manny'})
            .query({range: '1...5'})
            .query({order: 'desc'})
            .set('API-Key', 'foobar')
            .end((err, resp) => {
                if (!err) {
                    this.setState({someData: resp.text})
                }
            })
    }

    render() {
        return (
            <div>(this.state.someData || 'waiting for response ...')</div>
        )
    }
}

React.render(<App />, document.getElementById('root'))

// /search?query=Manny&range1...5&order=desc

// POST requests
request.post('/user')
    .set('Content-Type', 'application/json')
    .send('{"name": "tj", "pet": "tobi"}')
    .end(callback)