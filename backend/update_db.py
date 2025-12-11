import sqlite3

def migrate():
    db_path = 't:/PROYECTOS/SANJORVENTA-GIF/sanjor-website/backend/sql_app.db'
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    try:
        # Check if column exists
        cursor.execute("PRAGMA table_info(news)")
        columns = [info[1] for info in cursor.fetchall()]
        
        if 'allowed_roles' not in columns:
            print("Adding allowed_roles column to news table...")
            cursor.execute("ALTER TABLE news ADD COLUMN allowed_roles JSON DEFAULT '[]'")
            conn.commit()
            print("Migration successful: Added allowed_roles column.")
        else:
            print("Column allowed_roles already exists.")
            
    except Exception as e:
        print(f"Error during migration: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    migrate()
