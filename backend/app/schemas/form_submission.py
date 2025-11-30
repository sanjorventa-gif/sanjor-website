from typing import Dict, Any, Optional
from pydantic import BaseModel
from datetime import datetime

# Shared properties
class FormSubmissionBase(BaseModel):
    data: Dict[str, Any]

# Properties to receive on creation
class FormSubmissionCreate(FormSubmissionBase):
    pass

# Properties shared by models stored in DB
class FormSubmissionInDBBase(FormSubmissionBase):
    id: int
    form_id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Properties to return to client
class FormSubmission(FormSubmissionInDBBase):
    pass
