import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from app.db.session import SessionLocal
from app.models.carousel import CarouselItem
from app.models.download import Download
from app.models.history import History
from app.models.news import News
from sqlalchemy import text

def check_data():
    db = SessionLocal()
    try:
        carousel_count = db.query(CarouselItem).count()
        download_count = db.query(Download).count()
        history_count = db.query(History).count()
        news_count = db.query(News).count()
        
        print(f"Carousel Items: {carousel_count}")
        print(f"Downloads: {download_count}")
        print(f"History Items: {history_count}")
        print(f"News Items: {news_count}")
        
        # Check if tables exist
        tables = db.execute(text("SELECT name FROM sqlite_master WHERE type='table';")).fetchall()
        print("Tables:", [t[0] for t in tables])
        
    except Exception as e:
        print(f"Error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    check_data()
