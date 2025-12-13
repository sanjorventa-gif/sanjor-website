import sqlite3
import os

DB_PATH = 'backend/sql_app.db'

def force_migrate():
    print(f"Migrating {DB_PATH}...")
    if not os.path.exists(DB_PATH):
        print("Error: DB file not found at " + DB_PATH)
        return

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    try:
        cursor.execute("ALTER TABLE user ADD COLUMN newsletter_subscribed BOOLEAN DEFAULT 0")
        conn.commit()
        print("SUCCESS: Column 'newsletter_subscribed' added to " + DB_PATH)
    except Exception as e:
        if "duplicate column name" in str(e).lower():
            print("Column already exists in " + DB_PATH)
        else:
            print(f"FAILED: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    force_migrate()
