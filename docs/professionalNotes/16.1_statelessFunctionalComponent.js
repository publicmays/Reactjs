// index.js

import React from 'react'
import ReactDOM from 'react-dom'

import HomePage from './homepage'

ReactDOM.render(
    <HomePage />,
    document.getElementById('app')
);

// homepage.js

import React from 'react'
import {Component} from 'react';

import List from './list';

export default class Temp extends Component {
    construct(props) {
        super();
        this.state={users:[], showSearchResult: false, searchResult: []};
    }
    registerClick() {
        let users = this.state.users.slice();
        if (users.indexOf(this.refs.mail_id.value) == -1) {
            users.push(this.refs.mail_id.value);
            this.refs.mail_id.value = '';
            this.setState({users});
        } else {
            alert('user already registered');
        }
    }
    searchClick() {
        let users = this.state.users;
        let index = users.indexOf(this.refs.search.value);
        if (index >= 0) {
            this.setState({searchResult: users[index], showSearchResult: true});
        } else {
            alert('no user found with this mail id');
        }
    }
    hideSearchResult() {
        this.setState({showSearchResult: false});
    }
    render() {
        return(
            <div>
                <input placeholder='mail-id' ref='mail-id'/>
                <input type='submit' value='Click here to register'
                    onClick={this.registerClick.bind(this)} />

                <input placeholder='search' ref='search'/>
                <input type='submit' value='Click here to search'
                    onClick={this.searchClick.bind(this)} />
                    {this.state.showSearchResult ?
                        <div>
                            Search Result:
                                <List users={[this.state.searchResult]}/>
                                <p onClick={this.hideSearchResult.bind(this)}> Close this </p>
                        </div>
                        :
                        <div>
                            Registered Users:
                            {this.state.users.length ? 
                                <List users={this.state.users} />
                                :
                                "no user is registered"
                            }
                        </div>
                    }
            </div>
        );
    }
}

// list.js
import React from 'react'
var colors = ['#FFFFFF', '#000000']

var List = (props) => {
    return (
        <div>
            {
                props.users.map((user, i) => {
                    return(
                        <div key={i} stype={{color: colors[i%3]}}> {user}
                        </div>
                    );
                })
            }
        </div>
    );
}