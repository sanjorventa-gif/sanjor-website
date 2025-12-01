from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.db.base_class import Base

class WarrantyRegistration(Base):
    __tablename__ = "warranty_registrations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, index=True)
    phone = Column(String)
    city = Column(String)
    address = Column(String)
    stove_model = Column(String)
    serial_number = Column(String)
    purchase_date = Column(String)
    vendor = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
