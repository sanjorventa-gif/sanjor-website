import enum
from sqlalchemy import Column, Integer, String, Boolean, Enum
from app.db.base_class import Base

class UserRole(str, enum.Enum):
    ADMIN = "admin"
    USUARIO_NACIONAL = "usuario_nacional"
    USUARIO_INTERNACIONAL = "usuario_internacional"
    DISTRIBUIDOR_NACIONAL = "distribuidor_nacional"
    DISTRIBUIDOR_INTERNACIONAL = "distribuidor_internacional"

class User(Base):
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    role = Column(Enum(UserRole), default=UserRole.USUARIO_NACIONAL)
