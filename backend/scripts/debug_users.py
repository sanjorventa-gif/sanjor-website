import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app import crud, models, schemas
from pydantic import TypeAdapter
from typing import List

def debug_users():
    db = SessionLocal()
    try:
        print("Attempting to fetch users...")
        users = crud.user.get_multi(db)
        print(f"Successfully fetched {len(users)} users from DB.")
        
        for user in users:
            print(f"User: {user.email}, Role: {user.role} (Type: {type(user.role)})")
            
        print("Attempting Pydantic validation...")
        # Simulate FastAPI response validation
        adapter = TypeAdapter(List[schemas.User])
        validated_users = adapter.validate_python(users, from_attributes=True)
        print("Pydantic validation successful!")
        
    except Exception as e:
        print(f"CRITICAL ERROR: {e}")
        import traceback
        traceback.print_exc()
    finally:
        db.close()

if __name__ == "__main__":
    debug_users()
