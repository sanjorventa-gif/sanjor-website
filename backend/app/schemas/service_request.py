from typing import Optional
from pydantic import BaseModel
from datetime import datetime

# Shared properties
class ServiceRequestBase(BaseModel):
    name: str
    last_name: Optional[str] = None
    company: Optional[str] = None
    email: str
    phone: str
    city: str
    province: Optional[str] = None
    country: Optional[str] = None
    address: Optional[str] = None
    stove_model: str
    serial_number: Optional[str] = None
    rubro: Optional[str] = None
    work_area: Optional[str] = None
    purchase_date: Optional[str] = None
    problem_description: str

# Properties to receive on creation
class ServiceRequestCreate(ServiceRequestBase):
    recaptcha_token: str

# Properties shared by models stored in DB
class ServiceRequestInDBBase(ServiceRequestBase):
    id: int
    status: str = "Pendiente"
    user_id: Optional[int] = None
    created_at: datetime

    class Config:
        from_attributes = True

# Properties to return to client
class ServiceRequest(ServiceRequestInDBBase):
    pass

class ServiceRequestUpdateStatus(BaseModel):
    status: str
