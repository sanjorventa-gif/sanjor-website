from typing import Optional
from pydantic import BaseModel

class FaqBase(BaseModel):
    question: Optional[str] = None
    answer: Optional[str] = None
    order: Optional[int] = 0
    is_active: Optional[bool] = True

class FaqCreate(FaqBase):
    question: str
    answer: str

class FaqUpdate(FaqBase):
    pass

class FaqResponse(FaqBase):
    id: int

    class Config:
        from_attributes = True
