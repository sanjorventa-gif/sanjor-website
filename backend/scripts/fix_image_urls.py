import sys
import os

# Add the parent directory to sys.path to allow importing app modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.product import Product
from app.models.news import News
from app.models.history import History
from app.models.carousel import CarouselItem
from app.core.config import settings

def fix_urls():
    db: Session = SessionLocal()
    
    # Target string to replace
    OLD_URL_BASE = "http://localhost:8000"
    NEW_URL_BASE = settings.BACKEND_URL
    
    print(f"Replacing '{OLD_URL_BASE}' with '{NEW_URL_BASE}' in database...")
    
    try:
        # 1. Products
        products = db.query(Product).all()
        count = 0
        for p in products:
            if p.image and OLD_URL_BASE in p.image:
                p.image = p.image.replace(OLD_URL_BASE, NEW_URL_BASE)
                count += 1
            if p.technical_sheet and OLD_URL_BASE in p.technical_sheet:
                p.technical_sheet = p.technical_sheet.replace(OLD_URL_BASE, NEW_URL_BASE)
                count += 1
        print(f"Fixed {count} fields in Products")

        # 2. News
        news = db.query(News).all()
        count = 0
        for n in news:
            if n.image and OLD_URL_BASE in n.image:
                n.image = n.image.replace(OLD_URL_BASE, NEW_URL_BASE)
                count += 1
            # Check content for embedded images
            if n.content and OLD_URL_BASE in n.content:
                n.content = n.content.replace(OLD_URL_BASE, NEW_URL_BASE)
                count += 1
        print(f"Fixed {count} fields in News")

        # 3. History
        history = db.query(History).all()
        count = 0
        for h in history:
            if h.image and OLD_URL_BASE in h.image:
                h.image = h.image.replace(OLD_URL_BASE, NEW_URL_BASE)
                count += 1
        print(f"Fixed {count} fields in History")
        
        # 4. Carousel
        carousel = db.query(CarouselItem).all()
        count = 0
        for c in carousel:
            if c.image and OLD_URL_BASE in c.image:
                c.image = c.image.replace(OLD_URL_BASE, NEW_URL_BASE)
                count += 1
        print(f"Fixed {count} fields in Carousel")

        db.commit()
        print("Database update completed successfully.")
        
    except Exception as e:
        print(f"Error updating database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    fix_urls()
