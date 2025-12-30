import sqlite3

def migrate():
    db_path = 'sql_app.db'
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    try:
        # Check tables
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
        tables = [t[0] for t in cursor.fetchall()]
        print(f"Tables found: {tables}")
        
        target_table = 'carouselitem'
        if target_table not in tables:
            # Try to guess
            for t in tables:
                if 'carousel' in t.lower():
                    target_table = t
                    break
        
        print(f"Targeting table: {target_table}")

        # Check columns
        cursor.execute(f"PRAGMA table_info({target_table})")
        columns = [info[1] for info in cursor.fetchall()]
        
        if 'transition_effect' not in columns:
            print(f"Adding transition_effect column to {target_table} table...")
            cursor.execute(f"ALTER TABLE {target_table} ADD COLUMN transition_effect VARCHAR DEFAULT 'slide'")
            conn.commit()
            print("Migration successful: Added transition_effect column.")
        else:
            print("Column transition_effect already exists.")
            
    except Exception as e:
        print(f"Error during migration: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    migrate()
