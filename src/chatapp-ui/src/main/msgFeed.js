import React, { Component } from 'react';
import { Feed } from 'semantic-ui-react';
import Pusher from 'pusher-js';
import Cookies from 'js-cookie';

class MsgFeed extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data,
            user: Cookies.get('email')
        }
        this.receiveMsg = this.receiveMsg.bind(this)
        this.setScroll = this.setScroll.bind(this)
        // React Ref for chat box
        this.chatBox = React.createRef()
        // React Ref for latest message
        this.latestMsg = React.createRef()
    }
    setScroll() {
        // Set Scroll to latest Message
        this.chatBox.current.scrollTo(0, this.latestMsg.current.offsetTop)
    }
    receiveMsg() {
        // Activate the Pusher API
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
                data: self.state.data.concat(data.message),
            })
            self.setScroll()
        });
    }
    render() {
        return (
            <div className="chatBox" ref = { this.chatBox }>
                <Feed>
                    { 
                        this.state.data.map((msg, i) => {
                            let latestMsg = ""
                            if(i === (this.state.data.length-1)) {
                                // set React Ref for last element
                                latestMsg = this.latestMsg
                            }
                            return (
                                <Feed.Event>
                                    <Feed.Content>
                                        <Feed.Summary className="border">
                                            <Feed.Extra text>{ msg.message }</Feed.Extra>
                                            <p ref={ latestMsg } className="user">{ msg.from_user } { msg.timeStamp }</p>
                                        </Feed.Summary> 
                                    </Feed.Content>
                                </Feed.Event>
                            )
                        })
                    }
                </Feed>
            </div>
        )
    }

    componentDidMount() {
        this.receiveMsg()
        if(this.state.data.length != 0) {
            this.setScroll()
        }
    }
}

export default MsgFeed;