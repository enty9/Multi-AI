from flask import Flask, jsonify, request
from flask_cors import CORS
from g4f.client import Client
import g4f

app = Flask(__name__)
client = Client()
CORS(app, method=["POST"], supports_credentials=True)


@app.route('/')
def main():
    return 'Hui'

@app.route('/api/chatgpt', methods=['POST'])
def sendGpt():
    data = request.get_data()
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": str(data.decode('utf-8'))}],
        web_search=False
    )
    print(response.choices[0].message.content)
    return jsonify({
        'data': response.choices[0].message.content,
        'status': 'success'
        }), 201

@app.route('/api/deepseek', methods=['POST'])
def sendDeep():
    data = request.get_json()
    response = client.chat.completions.create(
        model=g4f.models.deepseek_v3,
        messages=[{"role": "user", "content": data['msg']}],
        web_search=False
    )
    print(data['msg'])
    print(response.choices[0].message.content)
    return jsonify({
        'data': response.choices[0].message.content,
        'status': 'success'
    }), 201

@app.route('/api/gemini', methods=['POST'])
def sendGemin():
    data = request.get_data()
    response = client.chat.completions.create(
        model=g4f.models.gemini_2_0_flash,
        messages=[{"role": "user", "content": data}],
        web_search=False
    )
    return jsonify({
        'data': response.choices[0].message.content,
        'status': 'success'
    }), 201

@app.route('/api/claude', methods=['POST'])
def sendClaude():
    data = request.get_data()
    response = client.chat.completions.create(
        model=g4f.models.claude_3_7_sonnet,
        messages=[{"role": "user", "content": data}],
        web_search=False
    )
    return jsonify({
        'data': response.choices[0].message.content,
        'status': 'success'
    }), 201

if __name__ == '__main__':
    app.run(debug=True)