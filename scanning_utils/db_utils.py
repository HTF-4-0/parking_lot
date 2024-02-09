import sqlite3
conn = sqlite3.connect('cars.db')
cursor = conn.cursor()

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

def park_car(pid,car):
    # check if a car is already parked
    cursor.execute(f"SELECT car FROM parking WHERE pid = {pid}")
    row = cursor.fetchone()
    if row[0]:
        print("Parking slot already occupied")
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
    cursor.execute("SELECT pid FROM parking WHERE car IS NULL")
    row = cursor.fetchone()
    if not row:
        print("No empty slot")
        return
    return row[0]
