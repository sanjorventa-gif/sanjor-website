import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app import crud, models

def fix_admin_role():
    db = SessionLocal()
    try:
        user = crud.user.get_by_email(db, email="admin@sanjor.com.ar")
        if user:
            print(f"Found admin user: {user.email}, Role: {user.role}")
            if user.role != models.UserRole.ADMIN:
                print("Updating role to ADMIN...")
                user.role = models.UserRole.ADMIN
                db.add(user)
                db.commit()
                db.refresh(user)
                print(f"Role updated to: {user.role}")
            else:
                print("Role is already ADMIN.")
        else:
            print("Admin user not found.")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    fix_admin_role()
