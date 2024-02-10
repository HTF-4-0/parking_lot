
from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from hashing import hash_string
import jwt
import datetime
from functools import wraps
from jwt_token import generate_token

secret_key = open('secret.key').read()

app = Flask(__name__)
CORS(app)
# Establish a connection to the MySQL database
db_connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root@1234",
    database="parkease"
)

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')

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

# connect datbase to a local file
@app.route('/',methods=['GET'])
def test():
    # return a success status

    return jsonify({'status': 'success'}), 200

@app.route('/signup', methods=['POST'])
def signup():
    # Extract signup data from the POST request
    signup_data = request.json
    
    # Extract data from the signup_data dictionary
    name = signup_data.get('name')  # Assuming the key in JSON is 'user_name'
    user_name = signup_data.get('username')  # Assuming the key in JSON is 'user_name'
    # check if the username already exists
    cursor = db_connection.cursor()
    cursor.execute("SELECT * FROM user WHERE user_name = %s", (user_name,))
    user = cursor.fetchone()
    if user:
        return jsonify({'error': 'Username already exists'}), 400
    
    phone = signup_data.get('phone')           # Assuming the key in JSON is 'phone'
    email = signup_data.get('email')           # Assuming the key in JSON is 'email'
    print(signup_data)
    # Password should be hashed and securely stored, this is just for demonstration
    password = signup_data.get('password')     # Assuming the key in JSON is 'password'
    passwords = hash_string(password)
    print(passwords)
    # Create a cursor object
    cursor = db_connection.cursor()

    # Define the INSERT statement
    insert_query = "INSERT INTO user (name, user_name, phone, email, passwords) VALUES (%s,%s, %s, %s, %s)"
    
    # Define the data to be inserted
    user_data = (name, user_name, phone, email, passwords)

    try:
        # Execute the INSERT statement
        cursor.execute(insert_query, user_data)

        # Commit the transaction
        db_connection.commit()

        # also return a jwt token
        message  = jsonify({'message': 'Signup successful'}), 200

        return jsonify({'message': 'Signup successful'}), 200
    except mysql.connector.Error as error:
        # Handle any errors that occur during the insertion process
        return jsonify({'error': str(error)}), 500
    finally:
        # Close the cursor
        cursor.close()

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

    # return a jwt token also

    if user and input_pass and user[0] == input_pass:                     
        return jsonify({'token': generate_token(username)}), 200
    else:
        return jsonify({'error': 'Invalid username or password'}), 401

@app.route('/protected', methods=['GET'])
@token_required
def protected(data):
    return jsonify({'message': 'This is a protected endpoint', 'data': data}), 200


if __name__ == '__main__':
    app.run(host='localhost', port=3360, debug=True)

# if __name__ == '__main__':
    # app.run(debug=True)
if __name__ == '__main__':
    app.run(host='localhost', port=3360, debug=True)
