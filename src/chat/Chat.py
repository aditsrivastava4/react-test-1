from flask import Flask, Blueprint, make_response
from flask import request, redirect, jsonify
import databaseOperation as crud
from flask import session
import pusher, json

chat = Blueprint('chat', __name__)

pusher_client = pusher.Pusher(
    app_id='694873',
    key='4192c4460a19ed4171c9',
    secret='ddafbc56cf7265b904e4',
    cluster='ap2',
    ssl=True
)


@chat.route('/send_message', methods = ['POST'])
def send_message():
    if request.method == 'POST':
        if request.headers['CSRFToken'] == session['CSRFToken']:
            if session['loggedIn']:
                message = json.loads(request.data.decode())
                data = {
                    'message': message,
                    'email': session['email']
                }
                crud.addMsg(data)
                msg = crud.getMsg()
                msg = msg[len(msg)-1]
                from_user = crud.get_User(id = msg.from_user)
                msgData = {
                    'message': msg.message,
                    'timeStamp': str(msg.timeStamp),
                    'from_user': from_user.name,
                    'email': from_user.email
                }
                pusher_client.trigger(
                    'chatConnection',
                    'my-event',
                    {
                        'message': msgData
                    }
                )
                return 'Sent', 200
        else:
            return redirect('/')

@chat.route('/syncChat', methods = ['POST'])
def syncChat():
    if request.method == 'POST':
        if request.headers['CSRFToken'] == session['CSRFToken']:
            if session['loggedIn']:
                message = crud.getMsg()
                data = []
                for msg in message:
                    from_user = crud.get_User(id = msg.from_user)
                    data.append({
                        'message': msg.message,
                        'timeStamp': msg.timeStamp.strftime('%d-%m-%Y %H:%M'),
                        'from_user': from_user.name,
                        'email': from_user.email
                    })
                response = make_response(jsonify(data))
                return response
        else:
            return redirect('/')