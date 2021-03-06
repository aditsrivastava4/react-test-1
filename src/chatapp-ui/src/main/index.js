import React, { Component } from 'react';
import { Form, Input, Button, Grid } from 'semantic-ui-react'
import MsgFeed from './msgFeed'

class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: null,
            data: null
        }
        this.newMsg = this.newMsg.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.chatSync = this.chatSync.bind(this)
        this.chatSync()
    }
    newMsg(event) {
        // To keep the track of the input field
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value,
        })
    }
    handleSubmit(event) {
        // on message form submit
        event.preventDefault()
        fetch('/send_message',{
            method: 'post',
            headers: this.props.chatRequest,
            body: JSON.stringify(this.state.message)
        })
        .then((response) => {
            this.setState({
                message: ""
            })
        })
    }
    chatSync() {
        // To Get all the Chat data
        fetch('/syncChat',{
            method: 'post',
            headers: this.props.chatRequest
        })
        .then((response) => {
            return response.json()
        })
        .then((response) => {
            this.setState({
                data: response
            })
        })
    }
    render() {
        return (
            <Grid divided className="containerWidth">
                <Grid.Row columns={1}>
                    <Grid.Column>
                        <h1>Chat</h1>
                        {/* Chat Box */}
                        { this.state.data != null?
                            <MsgFeed chatBox={ this.myRef } latestMsg={ this.latestMsg } data={ this.state.data }/> :
                            ""
                        }
                        <Form onSubmit={ this.handleSubmit }>
                            <Form.Field className="form-group">
                                <div className="col-sm-10">
                                    <Input focus name="message" type="text" placeholder="Type Your Message" value={ this.state.message } onChange={ this.newMsg } required />
                                </div>
                                <div className="col-sm-2">
                                    <Button type="submit">Send</Button>
                                </div>
                            </Form.Field>
                        </Form>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default Chat;