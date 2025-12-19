
import sys
import os

# Add backend to path
sys.path.append(os.path.join(os.getcwd(), 'backend'))

from app.db.session import SessionLocal
from app.models.faq import Faq
from app.schemas.faq import FaqResponse

def test_faq_query():
    db = SessionLocal()
    try:
        print("Querying FAQs...")
        faqs = db.query(Faq).all()
        print(f"Found {len(faqs)} FAQs")
        
        print("Serializing FAQs...")
        for faq in faqs:
            try:
                data = FaqResponse.from_orm(faq)
                print(f"Serialized FAQ {faq.id}: OK")
            except Exception as e:
                print(f"Failed to serialize FAQ {faq.id}: {e}")
                return
        
        print("All FAQs valid.")
    except Exception as e:
        print(f"Database error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    test_faq_query()
