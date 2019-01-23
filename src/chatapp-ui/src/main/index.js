import React, { Component } from 'react';
import { Form, Input, Button, Grid, Segment, Feed } from 'semantic-ui-react'
import MsgFeed from './msgFeed'

class Chat extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message: null,
            data: null,
            input: null
        }
        this.newMsg = this.newMsg.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.chatSync = this.chatSync.bind(this)
        this.chatSync()
    }
    newMsg(event) {
        event.preventDefault()
        this.setState({
            [event.target.name]: event.target.value,
            input: event.target
        })
    }
    handleSubmit(event) {
        event.preventDefault()
        fetch('/send_message',{
            method: 'post',
            headers: this.props.chatRequest,
            body: JSON.stringify(this.state.message)
        })
        .then((response) => {
            this.state.input.value = null
        })
    }
    chatSync() {
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
                        <Segment >
                            { this.state.data != null?
                                <MsgFeed data={ this.state.data }/> :
                                ""
                            }
                        </Segment>
                        <Form onSubmit={ this.handleSubmit }>
                            <Form.Field className="form-group">
                                <div className="col-sm-10">
                                    <Input name="message" type="text" placeholder="Type Your Message" onChange={ this.newMsg } required/>
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