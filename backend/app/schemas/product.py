from typing import Optional, List, Dict, Any
from pydantic import BaseModel

# Shared properties
class ProductBase(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    image: Optional[str] = None
    features: Optional[List[str]] = None
    dimensions: Optional[Dict[str, Any]] = None # {length, width, height, unit}
    temperature: Optional[Dict[str, Any]] = None # {min, max, unit}
    technical_sheet: Optional[str] = None
    order: Optional[int] = 0

# Properties to receive on item creation
class ProductCreate(ProductBase):
    name: str
    category: str
    description: str

# Properties to receive on item update
class ProductUpdate(ProductBase):
    pass

# Properties shared by models stored in DB
class ProductInDBBase(ProductBase):
    id: str

    class Config:
        from_attributes = True

# Properties to return to client
class Product(ProductInDBBase):
    pass

# Properties stored in DB
class ProductInDB(ProductInDBBase):
    pass
