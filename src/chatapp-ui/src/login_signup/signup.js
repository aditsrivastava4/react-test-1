import React, { Component } from 'react';
import { Button, Form, Input } from 'semantic-ui-react';
import Cookies from 'js-cookie';

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: null,
            email: null,
            password: null,
            invalid: false
        }
        this.formSubmit = this.formSubmit.bind(this)
        this.signUpValue = this.signUpValue.bind(this)
    }
    formSubmit(event) {
        event.preventDefault();
        let signUpData = {
            email: this.state.email,
            password: this.state.password,
            name: this.state.name
        }
        fetch('/signUp',{
            method: 'POST',
            headers: this.props.loginRequest,
            body: JSON.stringify(signUpData)
        })
        .then((response) => {
            if(response.status === 200) {
                Cookies.set('loggedIn', true, {
                    expires: 0.5
                })
                this.props.onLogIn();
            } else if(response.status === 409) {
                this.setState({
                    invalid: true
                })
            } else {
                alert('Bad Request')
            }
        })
    }
    signUpValue(event) {
        // change state of each value
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        // Sign Up Form
        return (
            <Form onSubmit={ this.formSubmit } className="form-horizontal">
                <Form.Field className="form-group">
                    <label className="control-label col-sm-2">Name</label>
                    <div className="col-sm-10">
                        <Input name="name" type="text" onChange={ this.signUpValue }/>
                    </div>
                </Form.Field>
                <Form.Field className="form-group">
                    <label className="control-label col-sm-2">Email</label>
                    <div className="col-sm-10">
                        <Input name="email" type="email" onChange={ this.signUpValue }/>
                    </div>
                </Form.Field>
                <Form.Field className="form-group">
                    <label className="control-label col-sm-2">Password</label>
                    <div className="col-sm-10">
                        <Input name="password" type="password" onChange={ this.signUpValue }/>
                    </div>
                </Form.Field>
                { this.state.invalid? 
                    <label className="text-danger">*User Already Exists</label>:
                    ""
                }
                <Form.Field className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                        <Button type="submit">SignUp</Button>
                    </div>
                </Form.Field>
            </Form>
        );
    }
}

export default SignUp;