from flask import Blueprint, jsonify, request
from g4f.client import Client
import g4f

api_bp = Blueprint("api", __name__)
client = Client()

@api_bp.route("/api/chatgpt", methods=['POST'])
def sendGpt():
    data = request.get_json()
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": data['msg']}],
        web_search=False,
    )
    print(response.choices[0].message.content)
    return jsonify({
        'data': response.choices[0].message.content,
        'status': 'success'
        }), 200

@api_bp.route('/api/deepseek', methods=['POST'])
def sendDeep():
    data = request.get_json()
    '''
    response = client.chat.completions.create(
        model=g4f.models.deepseek_v3,
        messages=[{"role": "user", "content": data['msg']}],
        web_search=False
    )
    print(data['msg'])
    print(response.choices[0].message.content)
    '''
    return jsonify({
        'data': f'You say {data['msg']}',
        'status': 'success'
    }), 201

@api_bp.route('/api/gemini', methods=['POST'])
def sendGemin():
    data = request.get_json()
    response = client.chat.completions.create(
        model=g4f.models.gemini_2_0_flash,
        messages=[{"role": "user", "content": data['msg']}],
        web_search=False
    )
    return jsonify({
        'data': response.choices[0].message.content,
        'status': 'success'
    }), 201

@api_bp.route('/api/claude', methods=['POST'])
def sendClaude():
    data = request.get_json()
    response = client.chat.completions.create(
        model=g4f.models.claude_3_7_sonnet,
        messages=[{"role": "user", "content": data['msg']}],
        web_search=False
    )
    return jsonify({
        'data': response.choices[0].message.content,
        'status': 'success'
    }), 201

@api_bp.route('/api/grok', methods=['POST'])
def sendGrok():
    data = request.get_json()
    response = client.chat.completions.create(
        model=g4f.models.grok_3,
        messages=[{"role": "user", "content": data['msg']}],
        web_search=False
    )
    return jsonify({
        'data': response.choices[0].message.content,
        'status': 'success'
    }), 201

@api_bp.route('/api/qwen', methods=['POST'])
def sendQwen():
    data = request.get_json()
    response = client.chat.completions.create(
        model=g4f.models.qwen_2_5_max,
        messages=[{"role": "user", "content": data['msg']}],
        web_search=False
    )
    return jsonify({
        'data': response.choices[0].message.content,
        'status': 'success'
    }), 201