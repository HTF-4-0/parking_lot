# add tables to database

import sqlite3

# Create a connection object
connection = sqlite3.connect('parkease.sqlite')

# Create a cursor object
cursor = connection.cursor()

# Create a table
# cursor.execute('''
# CREATE TABLE user (
# NAME VARCHAR(30) NOT NULL,
# USERNAME VARCHAR(30) NOT NULL,
# EMAIL VARCHAR(50) NOT NULL UNIQUE,
# PHONE VARCHAR(10) NOT NULL UNIQUE,
# PASSWORD CHAR(64) NOT NULL);
# ''')

# cursor.execute(
#     '''CREATE TABLE IF NOT EXISTS parking (
#         pid INTEGER PRIMARY KEY,
#         car TEXT
#     );
#     '''
#     )
# cursor.execute("""
# INSERT INTO parking VALUES
# (1,NULL),
# (2,NULL),
# (3,NULL),
# (4,NULL),
# (5,NULL);
# """)
# # Commit the changes
# connection.commit()

cursor.execute('''
CREATE TABLE IF NOT EXISTS park_history (
    car TEXT,
    in_time TEXT,
    out_time TEXT
);
''')
connection.commit()

