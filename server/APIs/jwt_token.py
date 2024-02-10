import jwt
import datetime
import dotenv

secret_key = open('secret.key').read()

def generate_token(username):

    # Set the expiration time to 7 days from now
    expiration_time = datetime.datetime.utcnow() + datetime.timedelta(days=1)
    
    payload = {
        'username': username,
        'exp': expiration_time  # Adding the expiration time to the payload
    }
    token = jwt.encode(payload, secret_key, algorithm='HS256')
    return token

def verify_token(token):
    try:
        payload = jwt.decode(token, secret_key, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return 'Token expired. Please log in again.'
    except jwt.InvalidTokenError:
        return 'Invalid token. Please log in again.'
