from typing import Optional, List, Any
from datetime import datetime
from pydantic import BaseModel

# Shared properties
class DownloadBase(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    file_url: Optional[str] = None
    category: Optional[str] = None
    language: Optional[str] = None
    allowed_roles: Optional[List[str]] = []

# Properties to receive on item creation
class DownloadCreate(DownloadBase):
    title: str
    file_url: str
    category: str
    language: str

# Properties to receive on item update
class DownloadUpdate(DownloadBase):
    pass

# Properties shared by models stored in DB
class DownloadInDBBase(DownloadBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Properties to return to client
class Download(DownloadInDBBase):
    pass
