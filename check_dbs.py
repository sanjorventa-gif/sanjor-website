import sqlite3
import os

def check_db(path):
    print(f"Checking DB at: {path}")
    if not os.path.exists(path):
        print("File does not exist.")
        return
    
    conn = sqlite3.connect(path)
    cursor = conn.cursor()
    try:
        cursor.execute("PRAGMA table_info(user)")
        columns = [info[1] for info in cursor.fetchall()]
        print(f"Columns in 'user' table: {columns}")
        if 'newsletter_subscribed' in columns:
            print(">>> 'newsletter_subscribed' FOUND.")
        else:
            print(">>> 'newsletter_subscribed' NOT FOUND.")
    except Exception as e:
        print(f"Error reading DB: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    check_db('backend/sql_app.db')
    check_db('sql_app.db')
