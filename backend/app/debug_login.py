from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app import crud
from app.core.security import verify_password

def debug_login():
    db = SessionLocal()
    email = "admin@sanjor.com.ar"
    password = "sanjor2024"
    
    print(f"Attempting to authenticate user: {email}")
    
    # 1. Get user
    user = crud.user.get_by_email(db, email=email)
    if not user:
        print("User not found!")
        return

    print(f"User found: {user.email}")
    print(f"Hashed password in DB: {user.hashed_password}")
    
    # 2. Verify password
    try:
        is_valid = verify_password(password, user.hashed_password)
        print(f"Password valid: {is_valid}")
        
        # 3. Create access token
        from app.core import security
        from datetime import timedelta
        from app.core.config import settings
        
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        token = security.create_access_token(
            user.id, expires_delta=access_token_expires
        )
        print(f"Token created successfully: {token[:20]}...")
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()

    db.close()

if __name__ == "__main__":
    debug_login()
