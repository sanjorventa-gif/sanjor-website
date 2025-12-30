from typing import Optional
from pydantic import BaseModel

# Shared properties
class CarouselItemBase(BaseModel):
    title: Optional[str] = None
    subtitle: Optional[str] = None
    image: Optional[str] = None
    order: Optional[int] = 0
    button_text: Optional[str] = None
    button_link: Optional[str] = None
    transition_effect: Optional[str] = "slide"
    overlay_effect: Optional[str] = "grid"

# Properties to receive on item creation
class CarouselItemCreate(CarouselItemBase):
    title: str
    image: str
    button_text: Optional[str] = None
    button_link: Optional[str] = None

# Properties to receive on item update
class CarouselItemUpdate(CarouselItemBase):
    pass

# Properties shared by models stored in DB
class CarouselItemInDBBase(CarouselItemBase):
    id: int

    class Config:
        from_attributes = True

# Properties to return to client
class CarouselItem(CarouselItemInDBBase):
    pass

# Properties stored in DB
class CarouselItemInDB(CarouselItemInDBBase):
    pass
