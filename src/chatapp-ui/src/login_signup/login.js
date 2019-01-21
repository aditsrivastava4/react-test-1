import React, { Component } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';
import Cookies from 'js-cookie';

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: null,
            password: null,
            invalid: false
        }
        this.formSubmit = this.formSubmit.bind(this)
        this.loginValue = this.loginValue.bind(this)
    }
    formSubmit(event) {
        event.preventDefault();
        let loginData = {
            email: this.state.email,
            password: this.state.password
        }
        fetch('/login',{
            method: 'post',
            headers: this.props.loginRequest,
            body: JSON.stringify(loginData)
        })
        .then((response) => {
            if(response.status == 200) {
                Cookies.set('loggedIn', true, {
                    expires: 0.5
                })
                this.props.onLogIn();
            } else if(response.status == 401) {
                this.setState({
                    invalid: true
                })
            } else {
                alert('Bad Request')
            }
        })
    }
    loginValue(event) {
        // change state of each value
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        return (
            <Form onSubmit={ this.formSubmit } className="form-horizontal">
                <Form.Field className="form-group">
                    <label className="control-label col-sm-2">Email</label>
                    <div className="col-sm-10">
                        <Input name="email" type="email" onChange={ this.loginValue }/>
                    </div>
                </Form.Field>
                <Form.Field className="form-group">
                    <label className="control-label col-sm-2">Password</label>
                    <div className="col-sm-10">
                        <Input name="password" type="password" onChange={ this.loginValue }/>
                    </div>
                </Form.Field>
                
                { this.state.invalid? 
                    <label className="text-danger">*Invalid Email or Password</label>:
                    ""
                }
                <Form.Field>
                    <a href="/"><label>Forget Password?</label></a>
                </Form.Field>
                <Form.Field className="form-group">
                    <Button type="submit">Login</Button>
                </Form.Field>
            </Form>
        );
    }
}

export default Login;