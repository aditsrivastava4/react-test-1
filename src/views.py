from flask import Flask, render_template
from flask import request, redirect, jsonify
from flask import session, make_response
import databaseOperation as crud
import pusher
import string, random

app = Flask(__name__)

pusher_client = pusher.Pusher(
    app_id='694117',
    key='ad40515b013be9d631f6',
    secret='9a6d13f3ac832c22119c',
    cluster='ap2',
    ssl=True
)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login', methods = ['POST'])
def login():
    print(request)
    print(request.headers)
    print(request.headers['X-Parachutes'])
    return 'hoal'

@app.route('/logout')
def logout():
    return 'hola'

@app.route('/sync', methods = ['POST'])
def syncHeader():
    csrfToken = ''.join(
            random.choice(
                string.ascii_letters +
                string.digits) for x in range(64))
    response = make_response()
    response.headers['X-CSRFToken'] = csrfToken
    return response

if __name__ == "__main__":
    app.secret_key = 'jkgifysT^&RT&Ydt6fagefifwe'
    app.debug = True
    app.run(host='0.0.0.0', port=5000)