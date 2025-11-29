from typing import Optional
from pydantic import BaseModel

# Shared properties
class HistoryBase(BaseModel):
    year: Optional[int] = None
    title: Optional[str] = None
    description: Optional[str] = None
    image: Optional[str] = None
    order: Optional[int] = 0

# Properties to receive on item creation
class HistoryCreate(HistoryBase):
    year: int
    title: str
    description: str

# Properties to receive on item update
class HistoryUpdate(HistoryBase):
    pass

# Properties shared by models stored in DB
class HistoryInDBBase(HistoryBase):
    id: int

    class Config:
        from_attributes = True

# Properties to return to client
class History(HistoryInDBBase):
    pass

# Properties stored in DB
class HistoryInDB(HistoryInDBBase):
    pass
