
import sqlite3
import os

def check_db(db_path, db_name):
    if not os.path.exists(db_path):
        print(f"[{db_name}] File not found at {db_path}")
        return

    print(f"--- Checking {db_name} ---")
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT id, year, image FROM history LIMIT 5")
        rows = cursor.fetchall()
        if not rows:
            print("No rows found in 'history' table.")
        else:
            for row in rows:
                print(f"ID: {row[0]}, Year: {row[1]}, Image: {row[2]}")
        conn.close()
    except Exception as e:
        print(f"Error reading {db_name}: {e}")

if __name__ == "__main__":
    check_db("sql_app.db", "Root DB")
    check_db("backend/sql_app.db", "Backend DB")
