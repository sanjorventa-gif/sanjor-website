from sqlalchemy import Column, Integer, String, DateTime, JSON, Text
from sqlalchemy.sql import func
from app.db.base_class import Base

class Download(Base):
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, nullable=True)
    file_url = Column(Text, nullable=False)
    category = Column(String, index=True)  # Manual, Catalogo, Informativo
    language = Column(String, index=True)  # ES, EN, PT
    allowed_roles = Column(JSON, default=list)  # List of roles: ["admin", "usuario_nacional", etc.]
    created_at = Column(DateTime(timezone=True), server_default=func.now())
