from flask import Flask, render_template
from flask import request, redirect, jsonify
from flask import session, make_response
import databaseOperation as crud
import pusher, json
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
    if not 'loggedIn' in session:
        session['loggedIn'] = False
    return render_template('index.html')

@app.route('/login', methods = ['POST'])
def login():
    if request.method == 'POST':
        if not session['loggedIn']:
            # Verifiying the CSRF Token
            if request.headers['CSRFToken'] == session['CSRFToken']:
                loginData = json.loads(request.data.decode())
                userData = crud.get_User(loginData['email'])

                if userData:
                    if crud.verify_UserPassword(loginData['email'], loginData['password']):
                        # User Successfully Signed In
                        session['name'] = userData.name
                        session['email'] = userData.email
                        session['loggedIn'] = True

                        response = make_response()
                        response.headers['Content'] = json.dumps({
                            'loggedIn': True
                        })
                        return response, 200
                    else:
                        # Invalid Email or Password
                        response = make_response()
                        response.headers['Content'] = json.dumps({
                            'response': 'Invalid Email or Password'
                        })
                        return response, 401
            else:
                # If CSRF Verification fails
                response = make_response()
                response.headers['Content'] = json.dumps({
                    'response': 'Invalid Token'
                })
                return response, 400
                
        # Redirect User If already Logged In
        return redirect('/')

@app.route('/signUp', methods = ['POST'])
def signUp():
    if request.method == 'POST':
        if not session['loggedIn']:
            # Verifiying the CSRF Token
            if request.headers['CSRFToken'] == session['CSRFToken']:
                signUpData = json.loads(request.data.decode())

                if crud.add_SignUp(signUpData):
                    # User Successfully Added and Signed In
                    session['name'] = signUpData['name']
                    session['email'] = signUpData['email']
                    session['loggedIn'] = True

                    response = make_response()
                    response.headers['Content'] = json.dumps({
                        'loggedIn': True
                    })
                    return response, 200
                else:
                    # User Already Exist
                    response = make_response()
                    response.headers['Content'] = json.dumps({
                        'response': 'User Already Exist'
                    })
                    return response, 409
            else:
                # If CSRF Verification fails
                response = make_response()
                response.headers['Content'] = json.dumps({
                    'response': 'Invalid Token'
                })
                return response, 400
                
        # Redirect User If already Logged In
        return redirect('/')

@app.route('/logout')
def logout():
    if session['loggedIn']:
        del session['name']
        del session['email']
        session['loggedIn'] = False
    return redirect('/')

@app.route('/sync', methods = ['POST'])
def syncHeader():
    csrfToken = ''.join(
            random.choice(
                string.ascii_letters +
                string.digits) for x in range(64))
    session['CSRFToken'] = csrfToken
    response = make_response()
    if session['loggedIn']:
        response.headers['name'] = session['name']
        response.headers['email'] = session['email']
    response.headers['CSRFToken'] = csrfToken
    return response

if __name__ == "__main__":
    app.secret_key = 'jkgifysT^&RT&Ydt6fagefifwe'
    app.debug = True
    app.run(host='0.0.0.0', port=5000)