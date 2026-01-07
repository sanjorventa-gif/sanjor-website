import sys
import os

# Add backend to python path
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from app.db.session import SessionLocal
from app.db.init_db import init_db

def main():
    db = SessionLocal()
    try:
        init_db(db)
        print("Users initialized successfully!")
    finally:
        db.close()

if __name__ == "__main__":
    main()
