import sys
import os
from sqlalchemy import create_engine, text

# Add the parent directory to sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.core.config import settings

def migrate():
    engine = create_engine(settings.SQLALCHEMY_DATABASE_URI)
    with engine.connect() as connection:
        try:
            # Check if column exists
            result = connection.execute(text("PRAGMA table_info(warranty_registrations)"))
            columns = [row[1] for row in result.fetchall()]
            
            if 'registration_type' not in columns:
                print("Adding registration_type column to warranty_registrations table...")
                connection.execute(text("ALTER TABLE warranty_registrations ADD COLUMN registration_type VARCHAR DEFAULT 'standard'"))
                print("Column added successfully.")
            else:
                print("Column registration_type already exists.")
                
            connection.commit()
            print("Migration completed successfully.")
        except Exception as e:
            print(f"Error during migration: {e}")

if __name__ == "__main__":
    migrate()
