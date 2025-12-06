import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from app.db.session import SessionLocal
from app.models.user import User

db = SessionLocal()
email = "tomyamigos2@gmail.com"
user = db.query(User).filter(User.email == email).first()

if user:
    print(f"User found: ID={user.id}, Email={user.email}, Role={user.role}")
else:
    print(f"User {email} not found.")

# Also check tomyamigos@gmail.com
email1 = "tomyamigos@gmail.com"
user1 = db.query(User).filter(User.email == email1).first()
if user1:
    print(f"User found: ID={user1.id}, Email={user1.email}, Role={user1.role}")

db.close()
