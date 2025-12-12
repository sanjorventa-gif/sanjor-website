import sys
import os
from sqlalchemy import text

# Add the parent directory to sys.path to allow importing app modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.db.session import SessionLocal

def add_button_to_carousel():
    db = SessionLocal()
    
    print("Migrating Carousel table to include buttons...")
    
    try:
        # 1. Add columns
        # SQLite doesn't support adding multiple columns in one statement reliably across versions or IF NOT EXISTS easily
        try:
            print("Adding 'button_text' column...")
            db.execute(text("ALTER TABLE carouselitem ADD COLUMN button_text VARCHAR"))
        except Exception as e:
            print(f"Column button_text might already exist: {e}")

        try:
            print("Adding 'button_link' column...")
            db.execute(text("ALTER TABLE carouselitem ADD COLUMN button_link VARCHAR"))
        except Exception as e:
            print(f"Column button_link might already exist: {e}")

        db.commit()
        print("Successfully added button columns to CarouselItem table.")
        
    except Exception as e:
        print(f"Error migrating database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    add_button_to_carousel()
