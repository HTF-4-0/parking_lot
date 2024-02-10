from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from hashing import hash_string

app = Flask(__name__)
CORS(app)

# Function to get a new SQLite connection
def get_db_connection():
    connection = sqlite3.connect('database.sqlite')
    connection.row_factory = sqlite3.Row
    return connection

# Function to close the SQLite connection
def close_db_connection(connection):
    connection.close()

# Function to get a SQLite cursor
def get_cursor(connection):
    return connection.cursor()

@app.route('/', methods=['GET'])
def test():
    return jsonify({'status': 'success'}), 200

@app.route('/signup', methods=['POST'])
def signup():
    signup_data = request.json
    user_name = signup_data.get('username')
    # check if the username already exists
    connection = get_db_connection()
    cursor = get_cursor(connection)
    cursor.execute("SELECT * FROM user WHERE user_name = ?", (user_name,))
    user = cursor.fetchone()
    if user:
        return jsonify({'error': 'Username already exists'}), 400
    
    phone = signup_data.get('phone')
    email = signup_data.get('email')
    password = signup_data.get('password')
    passwords = hash_string(password)

    try:
        connection = get_db_connection()
        cursor = get_cursor(connection)
        cursor.execute("INSERT INTO user (user_name, phone, email, passwords) VALUES (?, ?, ?, ?)", 
                       (user_name, phone, email, passwords))
        connection.commit()
        return jsonify({'message': 'Signup successful'}), 200
    except sqlite3.Error as error:
        return jsonify({'error': str(error)}), 500
    finally:
        close_db_connection(connection)

@app.route('/login', methods=['POST'])
def login():
    login_data = request.json
    
    # Extract username and password from the request
    username = login_data.get('username')
    password = login_data.get('password')
    input_pass = hash_string(password)

    try:
        connection = get_db_connection()
        cursor = get_cursor(connection)
        cursor.execute("SELECT passwords FROM user WHERE user_name = ?", (username,))
        user = cursor.fetchone()

        if user:
            stored_password = user['passwords']  # assuming column name is 'passwords'
            if input_pass == stored_password:
                # Passwords match, user authenticated
                return jsonify({'message': 'Login successful'}), 200
            else:
                # Incorrect password
                return jsonify({'error': 'Incorrect password'}), 401
        else:
            # User not found
            return jsonify({'error': 'User not found'}), 404
    except sqlite3.Error as error:
        return jsonify({'error': str(error)}), 500
    finally:
        close_db_connection(connection)

if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
