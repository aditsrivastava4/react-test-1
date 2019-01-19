from flask import Flask, render_template, redirect, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == "__main__":
    app.secret_key = 'jkgifysT^&RT&Ydt6fagefifwe'
    app.debug = True
    app.run(host='0.0.0.0', port=5000)