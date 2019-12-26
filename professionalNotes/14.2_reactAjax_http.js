import React from 'react'

class Users extends React.Component {
    constructor() {
        super();
        this.state = { users: [] };
    }

    componentDidMount() {
        fetch('api/users')
            .then(response => response.json())
            .then(json => this.setState( {users: json.data} ));
    }

    render() {
        return(
            <div>
                <h1>Users</h1>
                {
                    this.state.users.length == 0
                        ? 'Loading users'
                        : this.state.users.map(user => (
                            <figure key={user.id}>
                                <img src={user.avatar} />
                                <figcaption>{user.name}</figcaption>
                            </figure>
                        ))
                }
            </div>
        );
    }
}

ReactDOM.render(<Users />, document.getElementById('root'));