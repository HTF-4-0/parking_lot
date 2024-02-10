import hashlib

def hash_string(input_string):
    # Convert the input string to bytes
    input_bytes = input_string.encode('utf-8')
    
    # Create a SHA-256 hash object
    sha256_hash = hashlib.sha256()
    
    # Update the hash object with the input bytes
    sha256_hash.update(input_bytes)
    
    # Get the hexadecimal representation of the hashed value
    hashed_string = sha256_hash.hexdigest()
    
    return hashed_string

# Example usage:
# input_string = "password123"
# hashed_string = hash_string(input_string)

