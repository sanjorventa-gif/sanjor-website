from typing import Optional
from pydantic import BaseModel
from datetime import datetime

# Shared properties
class ServiceRequestBase(BaseModel):
    company: Optional[str] = None
    first_name: str
    last_name: str
    phone: Optional[str] = None
    email: str
    city: Optional[str] = None
    province: Optional[str] = None
    country: Optional[str] = None
    message: Optional[str] = None
    stove_model: Optional[str] = None
    serial_number: Optional[str] = None

# Properties to receive on creation
class ServiceRequestCreate(ServiceRequestBase):
    pass

# Properties to return to client
class ServiceRequest(ServiceRequestBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
