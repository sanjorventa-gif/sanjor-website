import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from app.db.session import engine
from app.db.base import Base
from app.models.history import History

print("Creating tables...")
Base.metadata.create_all(bind=engine)
print("Tables created.")
