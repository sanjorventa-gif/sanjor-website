import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app import crud, models
from app.core import security

def debug_login():
    db = SessionLocal()
    try:
        print("Attempting to authenticate admin...")
        user = crud.user.authenticate(db, email="admin@sanjor.com.ar", password="sanjor2024")
        if user:
            print(f"Authentication successful! User: {user.email}, Role: {user.role}")
        else:
            print("Authentication failed: Invalid credentials or user not found.")
            
        # Check if we can access UserRole
        print(f"UserRole Enum: {models.user.UserRole.ADMIN}")
        
    except Exception as e:
        print(f"CRITICAL ERROR: {e}")
        import traceback
        traceback.print_exc()
    finally:
        db.close()

if __name__ == "__main__":
    debug_login()
