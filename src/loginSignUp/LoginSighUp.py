from flask import Flask, Blueprint, make_response
from flask import request, redirect
import databaseOperation as crud
from flask import session
import json

loginSignUp = Blueprint('loginSignUp', __name__)


@loginSignUp.route('/login', methods = ['POST'])
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

@loginSignUp.route('/signUp', methods = ['POST'])
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

@loginSignUp.route('/logout')
def logout():
    if session['loggedIn']:
        del session['name']
        del session['email']
        session['loggedIn'] = False
    return redirect('/')
