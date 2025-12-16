import sqlite3
import os

# Target the specific backend database
DB_PATH = r"t:/PROYECTOS/SANJORVENTA-GIF/sanjor-website/backend/sql_app.db"

def add_columns():
    if not os.path.exists(DB_PATH):
        print(f"Database not found at {DB_PATH}")
        return

    print(f"Connecting to database at: {DB_PATH}")
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Define columns to check/add
    service_cols = [
        ("company", "VARCHAR"),
        ("last_name", "VARCHAR"),
        ("province", "VARCHAR"),
        ("country", "VARCHAR"),
        ("serial_number", "VARCHAR"),
        ("rubro", "VARCHAR"),
        ("work_area", "VARCHAR"),
        ("address", "VARCHAR") # Inspecting if address exists, though we made it optional in code, DB might need it if not newly created
    ]

    warranty_cols = [
        ("last_name", "VARCHAR"),
        ("company", "VARCHAR"),
        ("province", "VARCHAR"),
        ("country", "VARCHAR"),
        ("rubro", "VARCHAR"),
        ("work_area", "VARCHAR")
    ]

    print("\nUpdating service_requests table...")
    # First get existing columns to avoid errors or redundancy
    try:
        cursor.execute("PRAGMA table_info(service_requests)")
        existing_cols = [row[1] for row in cursor.fetchall()]
        print(f"Existing columns: {existing_cols}")

        for col_name, col_type in service_cols:
            if col_name not in existing_cols:
                try:
                    cursor.execute(f"ALTER TABLE service_requests ADD COLUMN {col_name} {col_type}")
                    print(f"Added column {col_name} to service_requests")
                except Exception as e:
                    print(f"Error adding {col_name}: {e}")
            else:
                print(f"Column {col_name} already exists.")
    except Exception as e:
        print(f"Error accessing service_requests: {e}")

    print("\nUpdating warranty_registrations table...")
    try:
        cursor.execute("PRAGMA table_info(warranty_registrations)")
        existing_cols = [row[1] for row in cursor.fetchall()]
        print(f"Existing columns: {existing_cols}")

        for col_name, col_type in warranty_cols:
            if col_name not in existing_cols:
                try:
                    cursor.execute(f"ALTER TABLE warranty_registrations ADD COLUMN {col_name} {col_type}")
                    print(f"Added column {col_name} to warranty_registrations")
                except Exception as e:
                    print(f"Error adding {col_name}: {e}")
            else:
                print(f"Column {col_name} already exists.")
    except Exception as e:
        print(f"Error accessing warranty_registrations: {e}")

    conn.commit()
    conn.close()
    print("\nMigration completed.")

if __name__ == "__main__":
    add_columns()
