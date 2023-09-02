from flask import Flask, render_template, request, jsonify
from bot import get_response
from flask_cors import CORS
import os
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

myport =  int(os.environ.get("PORT", 5000))

@app.route('/')
def message():
    return "Hey there. Veguinha's house"

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
        response = {'result': bot_response['result'], 'source':bot_response['source'] }
        return jsonify(response)

if __name__ == '__main__':
    app.run(port=myport)