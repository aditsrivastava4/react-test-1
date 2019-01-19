import React, { Component } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';

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
        console.log('hola')
        // this.setState({
        //     invalid: !this.state.invalid
        // })
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