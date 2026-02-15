import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from app.db.session import SessionLocal
from app.models.product import Product
from app.models.download import Download
# Try importing News and Faq if they exist
try:
    from app.models.news import News
except ImportError:
    News = None

try:
    from app.models.faq import Faq
except ImportError:
    Faq = None

def clean_sanjor_data():
    db = SessionLocal()
    
    print("Cleaning up old Sanjor data...")

    # Clear Products
    print("Clearing Products...")
    try:
        db.query(Product).delete()
        print("Products cleared.")
    except Exception as e:
        print(f"Error clearing products: {e}")

    # Clear Downloads
    print("Clearing Downloads...")
    try:
        db.query(Download).delete()
        print("Downloads cleared.")
    except Exception as e:
        print(f"Error clearing downloads: {e}")

    # Clear News
    if News:
        print("Clearing News...")
        try:
            db.query(News).delete()
            print("News cleared.")
        except Exception as e:
            print(f"Error clearing news: {e}")
    else:
        print("News model not found, skipping.")

    # Clear Faqs
    if Faq:
        print("Clearing FAQs...")
        try:
            db.query(Faq).delete()
            print("FAQs cleared.")
        except Exception as e:
            print(f"Error clearing FAQs: {e}")
    else:
        print("Faq model not found, skipping.")

    db.commit()
    db.close()
    print("Sanjor data cleanup complete!")

if __name__ == "__main__":
    clean_sanjor_data()
