from sqlalchemy import Column, Integer, String, Text
from app.db.base_class import Base

class History(Base):
    id = Column(Integer, primary_key=True, index=True)
    year = Column(Integer, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    image = Column(String, nullable=True)
    order = Column(Integer, default=0)
