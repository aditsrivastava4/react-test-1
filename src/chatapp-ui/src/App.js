import React, { Component } from 'react';
import './App.css';
import LoginSignUp from './login_signup/index';
import NavBar from './navbar/index';

class App extends Component {
    render() {
        return (
            <div className="App container">
                <NavBar />
                <LoginSignUp />
            </div>
        );
    }
}

export default App;
