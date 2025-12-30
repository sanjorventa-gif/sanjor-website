import sqlite3

def migrate():
    db_path = 'sql_app.db'
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    try:
        target_table = 'carouselitem'
        
        # Check columns
        cursor.execute(f"PRAGMA table_info({target_table})")
        columns = [info[1] for info in cursor.fetchall()]
        
        if 'overlay_effect' not in columns:
            print(f"Adding overlay_effect column to {target_table} table...")
            cursor.execute(f"ALTER TABLE {target_table} ADD COLUMN overlay_effect VARCHAR DEFAULT 'grid'")
            conn.commit()
            print("Migration successful: Added overlay_effect column.")
        else:
            print("Column overlay_effect already exists.")
            
    except Exception as e:
        print(f"Error during migration: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    migrate()
