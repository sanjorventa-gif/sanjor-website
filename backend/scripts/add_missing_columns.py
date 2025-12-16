import sqlite3
import os

DB_PATH = "../app/sql_app.db"

def add_columns():
    if not os.path.exists(DB_PATH):
        print(f"Database not found at {DB_PATH}")
        return

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Service Requests Columns
    service_cols = [
        ("company", "VARCHAR"),
        ("last_name", "VARCHAR"),
        ("province", "VARCHAR"),
        ("country", "VARCHAR"),
        ("city", "VARCHAR"), # Verify if exists
        ("serial_number", "VARCHAR")
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

    # Warranty Registrations Columns
    warranty_cols = [
        ("last_name", "VARCHAR"),
        ("company", "VARCHAR"),
        ("province", "VARCHAR"),
        ("country", "VARCHAR"),
        ("rubro", "VARCHAR"),
        ("work_area", "VARCHAR")
    ]

    print("\nUpdating warranty_registrations table...")
    for col_name, col_type in warranty_cols:
        try:
            cursor.execute(f"ALTER TABLE warranty_registrations ADD COLUMN {col_name} {col_type}")
            print(f"Added column {col_name} to warranty_registrations")
        except sqlite3.OperationalError as e:
            if "duplicate column" in str(e):
                print(f"Column {col_name} already exists in warranty_registrations")
            else:
                print(f"Error adding {col_name}: {e}")

    conn.commit()
    conn.close()
    print("\nMigration completed.")

if __name__ == "__main__":
    add_columns()
