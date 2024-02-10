
from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from hashing import hash_string

app = Flask(__name__)
CORS(app)
# Establish a connection to the MySQL database
db_connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="mysql@10",
    database="db"
)
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
    user_name = signup_data.get('username')  # Assuming the key in JSON is 'user_name'
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
    insert_query = "INSERT INTO user (user_name, phone, email, passwords) VALUES (%s, %s, %s, %s)"
    
    # Define the data to be inserted
    user_data = (user_name, phone, email, passwords)

    try:
        # Execute the INSERT statement
        cursor.execute(insert_query, user_data)

        # Commit the transaction
        db_connection.commit()

        return jsonify({'message': 'Signup successful'}), 200
    except mysql.connector.Error as error:
        # Handle any errors that occur during the insertion process
        return jsonify({'error': str(error)}), 500
    finally:
        # Close the cursor
        cursor.close()

# if __name__ == '__main__':
    # app.run(debug=True)
if __name__ == '__main__':
    app.run(host='localhost', port=3360, debug=True)
