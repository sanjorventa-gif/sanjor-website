import sys
import os
from sqlalchemy import text

# Add the parent directory to sys.path to allow importing app modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.db.session import SessionLocal

def set_default_carousel_buttons():
    db = SessionLocal()
    print("Setting default button text for Carousel items...")
    try:
        # Update all items to have 'Más Info' as button_text
        db.execute(text("UPDATE carouselitem SET button_text = 'Más Info' WHERE button_text IS NULL OR button_text = ''"))
        # Ensure title is not null to avoid potential issues, though unrelated
        db.commit()
        print("Successfully updated carousel buttons.")
    except Exception as e:
        print(f"Error updating database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    set_default_carousel_buttons()
