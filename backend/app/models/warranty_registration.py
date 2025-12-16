from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from app.db.base_class import Base

class WarrantyRegistration(Base):
    __tablename__ = "warranty_registrations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    last_name = Column(String)
    company = Column(String)
    email = Column(String, index=True)
    phone = Column(String)
    address = Column(String)
    city = Column(String)
    province = Column(String)
    country = Column(String)
    stove_model = Column(String)
    rubro = Column(String)
    work_area = Column(String)
    serial_number = Column(String)
    purchase_date = Column(String)
    vendor = Column(String)
    registration_type = Column(String, default="standard") # 'standard' or 'extension'
    created_at = Column(DateTime(timezone=True), server_default=func.now())
