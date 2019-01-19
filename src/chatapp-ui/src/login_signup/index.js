import React, { Component } from 'react';
import Login from './login';
import SignUp from './signup';
import { Grid } from 'semantic-ui-react';

class LoginSignUp extends Component {
    render() {
        return (
            <Grid divided className="containerWidth">
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <h1>Login</h1>
                        <Login />
                    </Grid.Column>
                    <Grid.Column>
                        <h1>SignUp</h1>
                        <SignUp />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default LoginSignUp;