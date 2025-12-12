import sys
import os
import re
import unicodedata
from sqlalchemy import text

# Add the parent directory to sys.path to allow importing app modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.news import News

def slugify(value: str) -> str:
    value = str(value)
    value = unicodedata.normalize('NFKD', value).encode('ascii', 'ignore').decode('ascii')
    value = re.sub(r'[^\w\s-]', '', value.lower())
    return re.sub(r'[-\s]+', '-', value).strip('-_')

def add_slug_to_news():
    db: Session = SessionLocal()
    
    print("Migrating News table to include slugs...")
    
    try:
        # 1. Add column if not exists (SQLite doesn't support IF NOT EXISTS in ADD COLUMN easily via typical SQL checks without querying PRAGMA, but we can try/catch)
        # However, we updated the model, so if we use Alembic it would handle it. 
        # Here we are doing manual migration.
        # Let's try to query a slug. If it fails, add the column.
        try:
            db.execute(text("SELECT slug FROM news LIMIT 1"))
        except Exception:
            print("Adding 'slug' column to 'news' table...")
            db.execute(text("ALTER TABLE news ADD COLUMN slug VARCHAR"))
            db.commit()

        # 2. Populate slugs
        news_items = db.query(News).all()
        count = 0
        for item in news_items:
            if not item.slug:
                slug = slugify(item.title)
                # Ensure unique
                counter = 1
                original_slug = slug
                # Check uniqueness against DB
                while db.query(News).filter(News.slug == slug).filter(News.id != item.id).first():
                    slug = f"{original_slug}-{counter}"
                    counter += 1
                
                item.slug = slug
                count += 1
                
        db.commit()
        print(f"Successfully generated slugs for {count} news items.")
        
    except Exception as e:
        print(f"Error migrating database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    add_slug_to_news()
