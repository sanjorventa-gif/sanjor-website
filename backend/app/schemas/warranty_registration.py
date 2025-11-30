from typing import Optional
from pydantic import BaseModel
from datetime import datetime, date

# Shared properties
class WarrantyRegistrationBase(BaseModel):
    company: Optional[str] = None
    first_name: str
    last_name: str
    email: str
    city: Optional[str] = None
    province: Optional[str] = None
    country: Optional[str] = None
    stove_model: Optional[str] = None
    serial_number: Optional[str] = None
    purchase_date: Optional[date] = None
    vendor: Optional[str] = None

# Properties to receive on creation
class WarrantyRegistrationCreate(WarrantyRegistrationBase):
    pass

# Properties to return to client
class WarrantyRegistration(WarrantyRegistrationBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
