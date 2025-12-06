import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from sqlalchemy import create_engine, text
from app.core.config import settings

def update_schema():
    engine = create_engine(settings.SQLALCHEMY_DATABASE_URI)
    with engine.connect() as connection:
        try:
            # Check if role column exists
            result = connection.execute(text("PRAGMA table_info(user)"))
            columns = [row[1] for row in result]
            
            if "role" not in columns:
                print("Adding role column to user table...")
                # SQLite doesn't support adding ENUM columns directly easily, so we add as VARCHAR
                # The application layer handles the Enum validation
                connection.execute(text("ALTER TABLE user ADD COLUMN role VARCHAR"))
                
                # Set default role for existing users
                print("Setting default role for existing users...")
                connection.execute(text("UPDATE user SET role = 'usuario_nacional' WHERE role IS NULL"))
                
                # Set admin role for superusers
                print("Setting admin role for superusers...")
                connection.execute(text("UPDATE user SET role = 'admin' WHERE is_superuser = 1"))
                
                connection.commit()
                print("Schema updated successfully.")
            else:
                print("Role column already exists.")
                
        except Exception as e:
            print(f"Error updating schema: {e}")

if __name__ == "__main__":
    update_schema()
