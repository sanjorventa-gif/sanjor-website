from typing import Optional
from pydantic import BaseModel
from datetime import datetime

# Shared properties
class ServiceRequestBase(BaseModel):
    name: str
    email: str
    phone: str
    city: str
    address: str
    stove_model: str
    purchase_date: str
    problem_description: str

# Properties to receive on creation
class ServiceRequestCreate(ServiceRequestBase):
    recaptcha_token: str

# Properties shared by models stored in DB
class ServiceRequestInDBBase(ServiceRequestBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Properties to return to client
class ServiceRequest(ServiceRequestInDBBase):
    pass
