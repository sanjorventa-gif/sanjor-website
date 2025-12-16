import sqlite3
import os

DB_PATH = "../sql_app.db" # Adjusted path based on typical structure if scripts is in backend/scripts and db is in backend/
# If previous worked with ../app/sql_app.db maybe it was a fluke or moved?
# Checking directory structure from memory: 
# backend/app/sql_app.db? Or backend/sql_app.db?
# I will make it robust.
import os

possible_paths = [
    "../app/sql_app.db",
    "../sql_app.db",
    "../../backend/app/sql_app.db",
    "../../backend/sql_app.db"
]

DB_PATH = None
for p in possible_paths:
    if os.path.exists(p):
        DB_PATH = p
        break

if not DB_PATH:
    # Try finding it
    for root, dirs, files in os.walk("../.."):
        if "sql_app.db" in files:
            DB_PATH = os.path.join(root, "sql_app.db")
            break

def add_columns():
    if not os.path.exists(DB_PATH):
        print(f"Database not found at {DB_PATH}")
        return

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Service Requests Columns
    service_cols = [
        ("rubro", "VARCHAR"),
        ("work_area", "VARCHAR")
    ]

    print("Updating service_requests table...")
    for col_name, col_type in service_cols:
        try:
            cursor.execute(f"ALTER TABLE service_requests ADD COLUMN {col_name} {col_type}")
            print(f"Added column {col_name} to service_requests")
        except sqlite3.OperationalError as e:
            if "duplicate column" in str(e):
                print(f"Column {col_name} already exists in service_requests")
            else:
                print(f"Error adding {col_name}: {e}")

    conn.commit()
    conn.close()
    print("\nMigration completed.")

if __name__ == "__main__":
    add_columns()
