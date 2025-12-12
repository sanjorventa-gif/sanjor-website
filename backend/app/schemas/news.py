from typing import Optional, List
from pydantic import BaseModel
from datetime import date

class NewsBase(BaseModel):
    title: str
    date: date
    category: str
    excerpt: str
    image: str
    slug: Optional[str] = None
    content: Optional[str] = None
    allowed_roles: Optional[List[str]] = []

class NewsCreate(NewsBase):
    pass

class NewsUpdate(NewsBase):
    pass

class News(NewsBase):
    id: int

    class Config:
        from_attributes = True
