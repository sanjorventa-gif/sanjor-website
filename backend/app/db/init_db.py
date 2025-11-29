from sqlalchemy.orm import Session

from app import crud, schemas, models
from app.core.config import settings
from app.db import base  # noqa: F401

# make sure all SQL Alchemy models are imported (app.db.base) before initializing DB
# otherwise, SQL Alchemy might fail to initialize relationships properly
# for more details: https://github.com/tiangolo/full-stack-fastapi-postgresql/issues/28

def init_db(db: Session) -> None:
    # Tables should be created with Alembic migrations
    # But if you don't want to use Alembic, you can create them here:
    from app.db.base_class import Base
    from app.db.session import engine

    Base.metadata.create_all(bind=engine)

    user = crud.user.get_by_email(db, email="admin@sanjor.com.ar")
    if not user:
        user_in = schemas.UserCreate(
            email="admin@sanjor.com.ar",
            password="sanjor2024",
            is_superuser=True,
            role=models.UserRole.ADMIN,
        )
        user = crud.user.create(db, obj_in=user_in)
