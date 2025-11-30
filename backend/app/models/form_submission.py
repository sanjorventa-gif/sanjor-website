from sqlalchemy import Column, Integer, DateTime, JSON, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.base_class import Base

class FormSubmission(Base):
    __tablename__ = "form_submissions"

    id = Column(Integer, primary_key=True, index=True)
    form_id = Column(Integer, ForeignKey("forms.id"), nullable=False)
    data = Column(JSON, nullable=False)  # Key-value pairs of submitted data
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    form = relationship("Form")
