from sqlalchemy import Column, Integer, String, DateTime, Text
from sqlalchemy.sql import func
from app.db.base_class import Base

class ServiceRequest(Base):
    id = Column(Integer, primary_key=True, index=True)
    company = Column(String, index=True, nullable=True)
    first_name = Column(String, index=True)
    last_name = Column(String, index=True)
    phone = Column(String, nullable=True)
    email = Column(String, index=True)
    city = Column(String, nullable=True)
    province = Column(String, nullable=True)
    country = Column(String, nullable=True)
    message = Column(Text, nullable=True)
    stove_model = Column(String, nullable=True)
    serial_number = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
