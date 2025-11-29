from sqlalchemy import Column, Integer, String, Text, JSON
from app.db.base_class import Base

class Product(Base):
    id = Column(String, primary_key=True, index=True)
    name = Column(String, index=True)
    category = Column(String, index=True)
    description = Column(Text)
    image = Column(Text) # Base64 or URL
    features = Column(JSON) # List of strings
    dimensions = Column(JSON) # {length, width, height, unit}
    temperature = Column(JSON) # {min, max, unit}
    technical_sheet = Column(Text, nullable=True) # Base64 or URL
    order = Column(Integer, default=0)
