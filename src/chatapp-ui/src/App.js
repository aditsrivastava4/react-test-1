import React, { Component } from 'react';
import './App.css';
import LoginSignUp from './login_signup/index';
import NavBar from './navbar/index';
import Chat from './main/index';
import Cookies from 'js-cookie';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            csrfToken: null,
            loggedIn: Cookies.get('loggedIn'),
            name: null,
            email: null
        }
        this.is_loggedIn = this.is_loggedIn.bind(this)
        this.getRequest()
    }
    is_loggedIn() {
        this.setState({
            loggedIn: true
        })
        if(Cookies.get('email') === undefined) {
            this.getRequest()
        }
    }
    getRequest() {
        fetch('/sync', {
            method: 'post'
        })
        .then((response) => {
            if(response.headers.get('email') !== undefined) {
                Cookies.set('name', response.headers.get('name'), {
                    expires: 0.5
                })
                Cookies.set('email', response.headers.get('email'), {
                    expires: 0.5
                })
                Cookies.set('loggedIn', true, {
                    expires: 0.5
                })
                this.setState({
                    name: response.headers.get('name'),
                    email: response.headers.get('email'),
                    loggedIn: true
                })
            } else {
                Cookies.remove('name')
                Cookies.remove('email')
                Cookies.set('loggedIn', false)
                this.setState({
                    loggedIn: false
                })
            }
            this.setState({
                csrfToken: new Headers({'CSRFToken': response.headers.get('CSRFToken')})
            })
        })
    }
    render() {
        if(this.state.csrfToken===null) {
            return (
                <div className="App container">
                    <NavBar loggedIn = { this.state.loggedIn }/>
                    <div>Loading....</div>
                </div>
            )
        }
        return (
            <div className="App container">
                <NavBar loggedIn = { this.state.loggedIn }/>
                { !this.state.loggedIn?
                    <LoginSignUp onLogIn = { this.is_loggedIn } loginRequest = { this.state.csrfToken }/> :
                    <Chat chatRequest = { this.state.csrfToken }/>
                }
            </div>
        );
    }
}

export default App;
