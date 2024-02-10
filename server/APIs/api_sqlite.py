from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from hashing import hash_string
import jwt
import datetime
from functools import wraps
from jwt_token import generate_token

app = Flask(__name__)
CORS(app)

secret_key = open('secret.key').read()

# Connect to SQLite database
db_connection = sqlite3.connect('parkease.sqlite',check_same_thread=False)
cursor = db_connection.cursor()

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        print(request.headers)
        token = request.json.get('Authorization')
        if not token:
            return jsonify({'message': 'Token is missing'}), 401

        try:
            data = jwt.decode(token, secret_key, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Invalid token'}), 401

        return f(data, *args, **kwargs)

    return decorated


@app.route('/', methods=['GET'])
def test():
    return jsonify({'status': 'success'}), 200

@app.route('/chill',methods=['POST'])
def chill():
    data = request.json.get('Authorization')
    print(data)
    return jsonify({'message': 'This is a protected endpoint', 'data': data}), 200


@app.route('/signup', methods=['POST'])
def signup():
    signup_data = request.json
    
    name = signup_data.get('name')
    user_name = signup_data.get('username')
    phone = signup_data.get('phone')
    email = signup_data.get('email')
    password = signup_data.get('password')
    hashed_password = hash_string(password)

    cursor.execute("SELECT * FROM user WHERE username = ?", (user_name,))
    user = cursor.fetchone()
    if user:
        return jsonify({'error': 'Username already exists'}), 400

    try:
        cursor.execute("INSERT INTO user (name, username, phone, email, password) VALUES (?, ?, ?, ?, ?)",
                       (name, user_name, phone, email, hashed_password))
        db_connection.commit()
        return jsonify({'token': generate_token(user_name)}), 200
    except sqlite3.Error as error:
        return jsonify({'error': str(error)}), 500

@app.route('/login', methods=['POST'])
def login():
    login_data = request.json
    
    username = login_data.get('username')
    password = login_data.get('password')
    input_pass = hash_string(password)

    cursor.execute("SELECT password FROM user WHERE username = ?", (username,))
    user = cursor.fetchone()

    if user and input_pass and user[0] == input_pass:                     
        return jsonify({'token': generate_token(username)}), 200
    else:
        return jsonify({'error': 'Invalid username or password'}), 401

@app.route('/protected', methods=['POST'])
@token_required
def protected(data):
    print(request.headers)
    return jsonify({'message': 'This is a protected endpoint', 'data': data}), 200

@app.route('/history', methods=['GET'])
def history():
    cursor.execute("SELECT * FROM park_history")
    history = cursor.fetchall()
    return jsonify(history)

@app.route('/parking', methods=['GET'])
def parking_status():
    cursor.execute("SELECT * FROM parking")
    status = cursor.fetchall()
    return jsonify(status)

if __name__ == '__main__':
    app.run(host='localhost', port=3360, debug=True)
