from typing import Optional
from pydantic import BaseModel
from datetime import datetime

# Shared properties
class WarrantyRegistrationBase(BaseModel):
    name: str
    last_name: Optional[str] = None
    company: Optional[str] = None
    email: str
    phone: Optional[str] = None
    city: str
    province: Optional[str] = None
    country: Optional[str] = None
    address: Optional[str] = None
    stove_model: str
    rubro: Optional[str] = None
    work_area: Optional[str] = None
    serial_number: str
    purchase_date: Optional[str] = None
    vendor: Optional[str] = None
    registration_type: Optional[str] = "standard"

# Properties to receive on creation
class WarrantyRegistrationCreate(WarrantyRegistrationBase):
    recaptcha_token: str

# Properties shared by models stored in DB
class WarrantyRegistrationInDBBase(WarrantyRegistrationBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Properties to return to client
class WarrantyRegistration(WarrantyRegistrationInDBBase):
    pass
