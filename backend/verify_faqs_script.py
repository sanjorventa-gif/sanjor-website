import sys
import os

# Add the current directory to sys.path so we can import from app
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.db.session import SessionLocal, engine
from app.models.faq import Faq
from sqlalchemy import text, inspect

def verify_data():
    inspector = inspect(engine)
    tables = inspector.get_table_names()
    print(f"EXISTING TABLES: {tables}")

    if "faqs" not in tables:
        print("ERROR: 'faqs' table does NOT exist. Run migrations.")
        return

    db = SessionLocal()
    try:
        print("--- CHECKING FAQS ---")
        faqs = db.query(Faq).all()
        for faq in faqs:
            print(f"ID: {faq.id}, Type: {type(faq.id)}")
            print(f"  Question: {faq.question!r}, Type: {type(faq.question)}")
            print(f"  Answer: {faq.answer!r}, Type: {type(faq.answer)}")
            print(f"  Order: {faq.order!r}, Type: {type(faq.order)}")
            print(f"  Is Active: {faq.is_active!r}, Type: {type(faq.is_active)}")
            
            # Check for potential Pydantic issues
            if faq.question is None:
                print("  [WARNING] Question is None")
            if faq.answer is None:
                print("  [WARNING] Answer is None")
            if not isinstance(faq.order, int) and faq.order is not None:
                print(f"  [ERROR] Order is not int: {type(faq.order)}")
            if not isinstance(faq.is_active, bool) and faq.is_active is not None:
                print(f"  [WARNING] Is Active is not bool (SQLite might allow int 0/1): {type(faq.is_active)}")
                
    except Exception as e:
        print(f"CRITICAL ERROR: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    verify_data()
