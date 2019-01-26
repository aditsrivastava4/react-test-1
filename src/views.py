from flask import Flask, render_template
from flask import request, redirect
from flask import session, make_response
import databaseOperation as crud
import string, random

# Module handles all chat operations
from chat.Chat import chat
# Module handles all login and signUp operations
from loginSignUp.LoginSighUp import loginSignUp

app = Flask(__name__)
app.register_blueprint(chat)
app.register_blueprint(loginSignUp)

@app.route('/')
def index():
    if not 'loggedIn' in session:
        # set a HTTP session cookie
        session['loggedIn'] = False
    return render_template('index.html')

@app.route('/sync', methods = ['POST'])
def syncHeader():
    # Creating CSRF Token
    csrfToken = ''.join(
            random.choice(
                string.ascii_letters +
                string.digits) for x in range(64))
    session['CSRFToken'] = csrfToken
    response = make_response()

    if session['loggedIn']:
        # If a user is logged in it returns 2 more headers with user name and email
        response.headers['name'] = session['name']
        response.headers['email'] = session['email']

    response.headers['CSRFToken'] = csrfToken
    # Returing response with CSRFToken Header
    return response

if __name__ == "__main__":
    app.secret_key = 'jkgifysT^&RT&Ydt6fagefifwe'
    app.debug = True
    app.run(host='0.0.0.0', port=5000)