import sys
import os
from sqlalchemy import create_engine, text

# Add parent directory to path so we can import config
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.core.config import settings

def migrate():
    engine = create_engine(settings.SQLALCHEMY_DATABASE_URI)
    
    with engine.connect() as connection:
        try:
            # Check if column exists first to avoid error
            # This is a basic check for SQLite, might be different for Postgres
            # but for this environment simplistic approach is often enough or we just try/except
            
            print("Attempting to add newsletter_subscribed column...")
            connection.execute(text("ALTER TABLE user ADD COLUMN newsletter_subscribed BOOLEAN DEFAULT 0"))
            print("Column added successfully.")
        except Exception as e:
            if "duplicate column name" in str(e).lower():
                print("Column already exists.")
            else:
                print(f"Error adding column: {e}")

if __name__ == "__main__":
    migrate()
