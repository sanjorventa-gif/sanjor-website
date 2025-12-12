from sqlalchemy import Column, Integer, String, Text, Date, JSON
from app.db.base_class import Base

class News(Base):
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    date = Column(Date)
    category = Column(String)
    excerpt = Column(Text)
    image = Column(String)
    content = Column(Text, nullable=True)
    slug = Column(String, unique=True, index=True, nullable=True)
    allowed_roles = Column(JSON, default=list)
