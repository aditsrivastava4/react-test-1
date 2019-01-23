import React, { Component } from 'react';
import { Feed } from 'semantic-ui-react';
import Pusher from 'pusher-js';

class MsgFeed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data
        }
        this.receiveMsg = this.receiveMsg.bind(this)
        this.receiveMsg()
    }
    receiveMsg() {
        let self = this
        // Enable pusher logging - don't include this in production
        // Pusher.logToConsole = true;

        let pusher = new Pusher('4192c4460a19ed4171c9', {
            cluster: 'ap2',
            forceTLS: true
        });

        let channel = pusher.subscribe('chatConnection');
        channel.bind('my-event', function(data) {
            self.setState({
                data: self.state.data.concat(data.message)
            })
        });
    }
    render() {
        return (
            <Feed>
                { this.state.data.map((msg) => {
                        return (
                            <Feed.Event>
                                <Feed.Content>
                                    <Feed.Summary className="border">
                                        <Feed.Extra text>{ msg.message }</Feed.Extra>
                                        <p className="user">{ msg.from_user } { msg.timeStamp }</p>
                                    </Feed.Summary> 
                                </Feed.Content>
                            </Feed.Event>
                        )
                    })
                }
            </Feed>
        )
    }
}

export default MsgFeed;