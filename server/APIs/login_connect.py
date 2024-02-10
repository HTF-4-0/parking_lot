from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from hashing import hash_string
import bcrypt

app = Flask(__name__)
CORS(app)
# Establish a connection to the MySQL database
db_connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="mysql@10",
    database="db"
)

@app.route('/',methods=['GET'])
def test():
    # return a success status

    return jsonify({'status': 'success'}), 200

@app.route('/login', methods=['POST'])
def login():
    login_data = request.json
    
    # Extract username and password from the request
    username = login_data.get('username')
    password = login_data.get('password')
    input_pass = hash_string(password)

    # Check if the username exists in the database
    cursor = db_connection.cursor()
    cursor.execute("SELECT passwords FROM user WHERE user_name = %s", (username,))
    user = cursor.fetchone()
    



    if user and input_pass and user[0] == input_pass:                     
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'error': 'Invalid username or password'}), 401




if __name__ == '__main__':
    app.run(host='localhost', port=3360, debug=True)