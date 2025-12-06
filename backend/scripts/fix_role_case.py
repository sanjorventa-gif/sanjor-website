import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app import crud, models

def fix_role_case():
    db = SessionLocal()
    try:
        users = db.query(models.User).all()
        print(f"Found {len(users)} users.")
        
        for user in users:
            current_role = user.role
            print(f"Checking user {user.email}: Role='{current_role}'")
            
            if current_role and current_role.isupper() and current_role != "ADMIN": 
                # Assuming ADMIN might be fine or handled, but let's just lowercase everything that matches the enum values
                # Actually, ADMIN value is "admin". So everything should be lowercase.
                
                new_role = current_role.lower()
                print(f"  -> Updating role to '{new_role}'")
                user.role = new_role
                db.add(user)
            elif current_role == "ADMIN": # Handle the case where I might have manually set it to ADMIN in my previous fix script if I wasn't careful? 
                # My previous script used models.UserRole.ADMIN which is "admin". So that should be fine.
                # But if there are other users with "ADMIN" (uppercase), fix them too.
                 new_role = current_role.lower()
                 print(f"  -> Updating role to '{new_role}'")
                 user.role = new_role
                 db.add(user)
                 
        db.commit()
        print("Roles updated successfully.")
        
    except Exception as e:
        print(f"Error: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    fix_role_case()
