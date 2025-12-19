import enum
from sqlalchemy import Boolean, Column, Integer, String
from sqlalchemy.orm import relationship
from app.db.base_class import Base

class UserRole(str, enum.Enum):
    ADMIN = "admin"
    USUARIO_NACIONAL = "usuario_nacional"
    USUARIO_INTERNACIONAL = "usuario_internacional"
    DISTRIBUIDOR_NACIONAL = "distribuidor_nacional"
    DISTRIBUIDOR_INTERNACIONAL = "distribuidor_internacional"
    SERVICIO_TECNICO = "servicio_tecnico"

class User(Base):
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    role = Column(String, default=UserRole.USUARIO_NACIONAL.value)
    newsletter_subscribed = Column(Boolean, default=False)
    
    # Personal Info
    name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    company = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    city = Column(String, nullable=True)
    province = Column(String, nullable=True)
    country = Column(String, nullable=True)
    rubro = Column(String, nullable=True)
    work_area = Column(String, nullable=True)

    service_requests = relationship("ServiceRequest", back_populates="user")
