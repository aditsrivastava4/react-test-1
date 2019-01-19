import React, { Component } from 'react';

class NavBar extends Component {
    render() {
        return (
            <div className="container-fluid">
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="/"><strong>Chat App</strong></a>
                        </div>
                        <div id="navbar" className="navbar-collapse collapse">
                            <ul className="nav navbar-nav navbar-right paddingul">
                                <li>
                                    <a href="/login">
                                        <span className="glyphicon glyphicon-log-in">
                                        </span>
                                        &nbsp;Login
                                    </a>
                                </li>
                                <li>
                                    <a href="/logout">
                                        <span className="glyphicon glyphicon-log-out">
                                        </span>
                                        &nbsp;Logout
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default NavBar;
