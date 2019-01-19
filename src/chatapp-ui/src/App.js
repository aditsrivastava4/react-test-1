import React, { Component } from 'react';
import './App.css';
import LoginSignUp from './login_signup/index';
import NavBar from './navbar/index';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            csrfToken: null,
            loggedIn: false
        }
        if(this.state.csrfToken == null) {
            this.getRequest()
        }
    }
    getRequest() {
        fetch('/sync', {method: 'POST'})
        .then((response)=>{
            this.setState({
                csrfToken: new Headers({'X-CSRFToken': response.headers.get('X-CSRFToken')})
            })
        })
    }
    is_loggedIn() {
        this.setState({
            loggedIn: true
        })
    }
    render() {
        return (
            <div className="App container">
                <NavBar />
                { !this.state.loggedIn?
                    <LoginSignUp onLogIn = { this.is_loggedIn } loginRequest = { this.state.csrfToken } /> :
                    ""
                }
            </div>
        );
    }
}

export default App;
