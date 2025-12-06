import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from app.db.session import SessionLocal
from app import crud

db = SessionLocal()
user = crud.user.get_by_email(db, email="admin@sanjor.com.ar")
if user:
    print(f"User found: {user.email}, Role: {user.role}, Active: {user.is_active}")
else:
    print("User admin@sanjor.com.ar NOT found")
