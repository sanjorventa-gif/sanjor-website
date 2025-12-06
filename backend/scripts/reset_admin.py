import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from app.db.session import SessionLocal
from app.crud.crud_user import user as crud_user
from app.core.security import get_password_hash

def reset_admin():
    db = SessionLocal()
    try:
        email = "admin@sanjor.com.ar"
        admin = crud_user.get_by_email(db, email=email)
        
        if not admin:
            print(f"User {email} not found!")
            return
        
        new_password = "admin"
        hashed_pw = get_password_hash(new_password)
        
        # Update password directly
        admin.hashed_password = hashed_pw
        db.add(admin)
        db.commit()
        print(f"Password for {email} has been reset to: {new_password}")
        
    except Exception as e:
        print(f"Error resetting password: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    reset_admin()
