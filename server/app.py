from flask import Flask, render_template, session, request, redirect, jsonify
import pyrebase
from bot import get_response
from flask_cors import CORS
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "https://vegacrypto.xyz"}})

config = {
    'apiKey': "AIzaSyDLZCQygmgknsHuLoGY8ciEOTmSyVQXDM8",
    'authDomain': "vegabot-7f89f.firebaseapp.com",
    'projectId': "vegabot-7f89f",
    'storageBucket': "vegabot-7f89f.appspot.com",
    'messagingSenderId': "148345001704",
    'appId': "1:148345001704:web:9cd41ac9f6f19bde561b5d",
    'measurementId': "G-94HXXTXCPC",
    'databaseURL': ''
}

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()

app.secret_key = 'secret'


@app.route('/')
def message():
    return "Hey there. Veguinha's house"

@app.route('/auth', methods=['POST', 'GET'])
def authentication():
    data = request.json

    if 'user' in session:
        return jsonify({
            'success': True,
            'email': session['user']
        })

    if request.method == 'POST':
        email = data.get('email')
        password = data.get('pwd')
        type = data.get('type')

        try:
            if type == 'login':
                user = auth.sign_in_with_email_and_password(email, password)
                session['user'] = email
                user['localId']
                return jsonify({
                    'success': True,
                    'email': user['email'],
                    'uid': user['localId']
                })
        except Exception as e:
            return jsonify({
                'success': False,
                'error': str(e)
            })
        
        try:
            if type == 'register':
                user = auth.create_user_with_email_and_password(email, password)
                verify = auth.send_email_verification(user['idToken'])
                print(verify)
                verify

                return jsonify({
                    'success': True,
                    'email': user['email'],
                    'uid': user['localId'],
                })
        except Exception as e:
            return jsonify({
                'success': False,
                'error': str(e)
            })

        try:
            if type == 'reset':
                auth.send_password_reset_email(email)
                return jsonify({
                    'success': True,
                    'email': email
                })
        except Exception as e:
            return jsonify({
                'success': False,
                'error': str(e)
            })

@app.route('/predict', methods=['POST'])
def chat(): 
    data = request.json
    user_input = data.get('input')
    user_id = data.get('id')
    lang = data.get('lang')
    bot_response = get_response(user_id, user_input, lang)
    if "error" in bot_response:
        return jsonify({"error": bot_response["error"]})

    else:
        response = {'result': bot_response['result'], 'source': bot_response['source']}
        return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True)