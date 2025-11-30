from typing import List, Optional, Any, Dict
from pydantic import BaseModel
from datetime import datetime

# Field Definition Schema
class FormField(BaseModel):
    name: str
    label: str
    type: str  # text, email, textarea, number, date, select
    required: bool = False
    options: Optional[List[str]] = None  # For select type

# Shared properties
class FormBase(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    fields: Optional[List[FormField]] = None
    is_active: Optional[bool] = True

# Properties to receive on creation
class FormCreate(FormBase):
    title: str
    slug: str
    fields: List[FormField]

# Properties to receive on update
class FormUpdate(FormBase):
    pass

# Properties shared by models stored in DB
class FormInDBBase(FormBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# Properties to return to client
class Form(FormInDBBase):
    pass
