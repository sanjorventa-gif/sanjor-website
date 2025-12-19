from pydantic import BaseModel, EmailStr
from typing import Optional

class ContactBase(BaseModel):
    name: str # Combined name/lastname usually, but frontend sends separate? Frontend sends name, lastname.
    lastname: Optional[str] = None
    email: EmailStr
    phone: Optional[str] = None
    company: Optional[str] = None
    message: str
    rubro: Optional[str] = None
    cargo: Optional[str] = None
    recaptcha_token: Optional[str] = None

class ContactCreate(ContactBase):
    pass
