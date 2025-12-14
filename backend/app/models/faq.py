from sqlalchemy import Column, Integer, String, Boolean
from app.db.base_class import Base

class Faq(Base):
    __tablename__ = "faqs"

    id = Column(Integer, primary_key=True, index=True)
    question = Column(String, index=True)
    answer = Column(String)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
