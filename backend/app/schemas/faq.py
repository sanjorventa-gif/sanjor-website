from typing import Optional
from pydantic import BaseModel

class FaqBase(BaseModel):
    question: str
    answer: str
    order: Optional[int] = 0
    is_active: Optional[bool] = True

class FaqCreate(FaqBase):
    pass

class FaqUpdate(FaqBase):
    pass

class FaqResponse(FaqBase):
    id: int

    class Config:
        from_attributes = True
