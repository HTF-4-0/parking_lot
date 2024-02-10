import sqlite3
conn = sqlite3.connect('parking.sqlite')
cursor = conn.cursor()

# Define the priority order of the parking spot
priority_order = [5, 2, 3, 1, 4]
# to create a basic table to store the parking slots
def create_db():
    cursor.execute(
    '''CREATE TABLE IF NOT EXISTS parking (
        pid INTEGER PRIMARY KEY,
        car TEXT
    );
    '''
    )
    cursor.execute("""
    INSERT INTO parking VALUES
    (1,NULL),
    (2,NULL),
    (3,NULL),
    (4,NULL),
    (5,NULL);
    """)
    conn.commit()

def view_parking():
    cursor.execute("SELECT * FROM parking")
    rows = cursor.fetchall()
    # display it well
    print("pid car")
    for row in rows:
        print(row[0], row[1] if row[1] else "empty")

def park_car(car):
    pid = get_empty_slot()
    if pid is None:
        print("No empty slot")
        return
    # check if car is already parked
    cursor.execute(f"SELECT pid FROM parking WHERE car = '{car}'")
    row = cursor.fetchone()
    if row:
        print(f"{car} is already parked at {row[0]}")
        return
    cursor.execute(f"""
        UPDATE parking
        SET car="{car}"
        WHERE pid = {pid};
    """)
    conn.commit()

def unpark_car(car):
    # check if the car is parked
    cursor.execute(f"SELECT pid FROM parking WHERE car = '{car}'")
    row = cursor.fetchone()
    if not row:
        print(f"{car} is not parked")
        return
    cursor.execute(f'''
        UPDATE parking
        SET car = NULL
        WHERE car = "{car}";
    ''')
    conn.commit()

def get_car(pid):
    cursor.execute(f"""
        SELECT car
        FROM parking
        WHERE pid = {pid};
    """)
    return cursor.fetchone()[0]

# get a empty parking slot
def get_empty_slot():
    # Define the priority order for each mall 

    # Iterate through the priority order
    for pid in priority_order:
        cursor.execute(f"SELECT car FROM parking WHERE pid = {pid}")
        row = cursor.fetchone()
        # Check if the slot is empty
        if row[0] is None:
            return pid  # Return the first empty slot according to priority order
    print("No empty slot")
    return None  # Return None if no empty slot found
