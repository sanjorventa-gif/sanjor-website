import sqlite3
import os

PLACEHOLDER_IMAGE = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23EDF2F7'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='%23A0AEC0'%3ESAN JOR%3C/text%3E%3C/svg%3E"

def find_db():
    candidates = [
        'backend/data/sql_app.db',
        'backend/sql_app.db',
        'sql_app.db'
    ]
    for p in candidates:
        if os.path.exists(p):
            return p
    return None

def fix_images():
    db_path = find_db()
    if not db_path:
        print("Error: Could not find sql_app.db")
        return

    print(f"Using database: {db_path}")
    
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        print("Checking for broken product images...")
        query = "SELECT id, name, image FROM product WHERE image LIKE '%welcometoscotland%' OR image LIKE '%placeholder.com%' OR image LIKE '%via.placeholder%'"
        cursor.execute(query)
        rows = cursor.fetchall()
        
        if not rows:
            print("No broken images found matching criteria.")
        else:
            print(f"Found {len(rows)} products with broken images:")
            for row in rows:
                print(f" - {row[1]} ({row[0]}): {row[2][:50]}...")
                
            # Update
            update_query = "UPDATE product SET image = ? WHERE image LIKE '%welcometoscotland%' OR image LIKE '%placeholder.com%' OR image LIKE '%via.placeholder%'"
            cursor.execute(update_query, (PLACEHOLDER_IMAGE,))
            conn.commit()
            print("Successfully updated all broken images.")
            
        conn.close()
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    fix_images()
