from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.base_class import Base

class ServiceRequest(Base):
    __tablename__ = "service_requests"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, index=True)
    company = Column(String)
    last_name = Column(String)
    phone = Column(String)
    address = Column(String)
    city = Column(String)
    province = Column(String)
    country = Column(String)
    stove_model = Column(String)
    serial_number = Column(String)
    rubro = Column(String)
    work_area = Column(String)
    purchase_date = Column(String) # Storing as string for simplicity, or Date if preferred
    problem_description = Column(Text)
    status = Column(String, default="Pendiente")
    user_id = Column(Integer, ForeignKey("user.id"), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="service_requests")
