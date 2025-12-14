import sys
import os

# Add the parent directory to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from app.db.session import engine
from app.db.base import Base
from app.models.faq import Faq

def create_table():
    print("Creating faqs table...")
    Faq.__table__.create(bind=engine)
    print("Table created successfully!")

if __name__ == "__main__":
    create_table()
