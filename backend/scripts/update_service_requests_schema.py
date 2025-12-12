import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from sqlalchemy import text
from app.db.session import SessionLocal

def update_service_requests_schema():
    db = SessionLocal()
    print("Migrating Service Requests table...")
    try:
        try:
            print("Adding 'status' column...")
            db.execute(text("ALTER TABLE service_requests ADD COLUMN status VARCHAR DEFAULT 'Pendiente'"))
            # Backfill existing nulls if any (though default should handle future inserts, existing rows need value)
            db.execute(text("UPDATE service_requests SET status = 'Pendiente' WHERE status IS NULL"))
        except Exception as e:
            print(f"Column status might already exist: {e}")

        try:
            print("Adding 'user_id' column...")
            db.execute(text("ALTER TABLE service_requests ADD COLUMN user_id INTEGER"))
            # We can't easily backfill user_id without logic, so we leave it NULL
        except Exception as e:
            print(f"Column user_id might already exist: {e}")

        db.commit()
        print("Successfully updated ServiceRequest table.")
        
    except Exception as e:
        print(f"Error migrating database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    update_service_requests_schema()
