from typing import Optional
from pydantic import BaseModel
from datetime import datetime

# Shared properties
class WarrantyRegistrationBase(BaseModel):
    name: str
    email: str
    phone: str
    city: str
    address: str
    stove_model: str
    serial_number: str
    purchase_date: str
    vendor: str

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
