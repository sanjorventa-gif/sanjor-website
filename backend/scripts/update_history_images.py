
import logging
import sys
import os

# Add the parent directory to sys.path to allow imports from app
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from app.db.session import SessionLocal
from app.models.history import History

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def update_history_images():
    db = SessionLocal()
    try:
        logger.info("Updating History images...")
        
        # Mapping of year (unique enough for this) to dummy image URL
        # Using Unsplash source for random but relevant images
        images_map = {
            2019: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", # Lab/Expo
            2018: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", # Celebration/Meeting
            2012: "https://images.unsplash.com/photo-1581093458791-9f302e6d8169?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", # Tech
            2010: "https://images.unsplash.com/photo-1555664424-778a69fdb6c8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", # Electronics
            2009: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", # Science/Math
            2004: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", # Shipping/Export
            1994: "https://images.unsplash.com/photo-1565514020176-892eb1036e62?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", # Factory
            1993: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", # Team
            1984: "https://images.unsplash.com/photo-1531297461137-81f969522fd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", # Industry
            1978: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", # Building
            1950: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80", # Vintage/Medical
        }

        history_items = db.query(History).all()
        
        for item in history_items:
            if item.year in images_map:
                item.image = images_map[item.year]
                logger.info(f"Updated image for year {item.year}")
            else:
                # Default fallback
                item.image = "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                logger.info(f"Updated default image for year {item.year}")

        db.commit()
        logger.info("Successfully updated all History images.")

    except Exception as e:
        logger.error(f"Error updating images: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    update_history_images()
