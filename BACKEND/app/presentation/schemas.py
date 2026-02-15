from pydantic import BaseModel, EmailStr, Json
from typing import Optional, Dict, Any, List
from datetime import datetime

# --- Feature Schemas ---
class FeatureBase(BaseModel):
    title: str
    description: Optional[str] = None
    icon_name: Optional[str] = "FaCheckCircle"
    order: int = 0

class FeatureCreate(FeatureBase):
    pass

class FeatureUpdate(FeatureBase):
    pass

class FeatureDTO(FeatureBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True

# --- WhyItem Schemas ---
class WhyItemBase(BaseModel):
    title: str
    text: str
    icon_name: Optional[str] = "FaCheckCircle"
    order: int = 0

class WhyItemCreate(WhyItemBase):
    pass

class WhyItemDTO(WhyItemBase):
    id: int

    class Config:
        from_attributes = True

# --- Template Schemas ---
class TemplateBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None
    categories: List[str] = []
    thumbnail_url: Optional[str] = None
    glow_color: Optional[str] = "#EC2A64"
    config_schema: Dict[str, Any]
    show_on_home: bool = False

class TemplateCreate(TemplateBase):
    pass

class TemplateDTO(TemplateBase):
    id: int
    is_active: bool
    created_at: datetime
    show_on_home: bool # Explicitly include it in DTO as well just in case, though it inherits.

    class Config:
        from_attributes = True

# --- Invitation Schemas ---
class InvitationBase(BaseModel):
    template_id: int
    content: Dict[str, Any]
    owner_email: EmailStr

class InvitationCreate(InvitationBase):
    pass

class InvitationUpdate(BaseModel):
    content: Optional[Dict[str, Any]] = None
    owner_email: Optional[EmailStr] = None

class GooglePackDTO(BaseModel):
    id: int
    status: str
    drive_folder_url: Optional[str] = None
    rsvp_sheet_url: Optional[str] = None
    songs_sheet_url: Optional[str] = None
    error_message: Optional[str] = None
    
    class Config:
        from_attributes = True

class InvitationDTO(InvitationBase):
    id: int
    slug: str
    is_paid: bool
    created_at: datetime
    updated_at: Optional[datetime] = None
    template_id: Optional[int] = None
    
    google_pack: Optional[GooglePackDTO] = None # Nested pack info
    
    class Config:
        from_attributes = True

class InvitationPublicDTO(BaseModel):
    """
    Limited view for the public demo/invitation.
    """
    slug: str
    content: Dict[str, Any]
    template: TemplateDTO # Embedded template details needed to render
    is_paid: bool

# --- FAQ Schemas ---
class FAQBase(BaseModel):
    question: str
    answer: str
    order: int = 0
    is_active: bool = True

class FAQCreate(FAQBase):
    pass

class FAQUpdate(FAQBase):
    pass

class FAQDTO(FAQBase):
    id: int

    class Config:
        from_attributes = True

# --- News Schemas ---
class NewsBase(BaseModel):
    title: str
    summary: Optional[str] = None
    content: str
    image_url: Optional[str] = None
    is_published: bool = True

class NewsCreate(NewsBase):
    pass

class NewsUpdate(BaseModel):
    title: Optional[str] = None
    summary: Optional[str] = None
    content: Optional[str] = None
    image_url: Optional[str] = None
    is_published: Optional[bool] = None

class NewsDTO(NewsBase):
    id: int
    slug: str
    published_at: datetime
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True

# --- Multimedia Schemas ---
class MultimediaBase(BaseModel):
    url: str
    file_type: str = "image"
    filename: Optional[str] = None
    classification: Optional[str] = "general"
    invitation_id: Optional[int] = None

class MultimediaCreate(MultimediaBase):
    pass

class MultimediaDTO(MultimediaBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
