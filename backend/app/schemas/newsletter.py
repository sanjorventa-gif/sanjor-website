from pydantic import BaseModel, EmailStr
from datetime import datetime

class NewsletterBase(BaseModel):
    email: EmailStr

class NewsletterCreate(NewsletterBase):
    pass

class Newsletter(NewsletterBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
