from sqlalchemy import Column, Integer, String
from app.db.base_class import Base

class CarouselItem(Base):
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    subtitle = Column(String, nullable=True)
    image = Column(String, nullable=False)
    order = Column(Integer, default=0)
    button_text = Column(String, nullable=True)
    button_link = Column(String, nullable=True)
    transition_effect = Column(String, default="slide") # fade, slide, zoom
    overlay_effect = Column(String, default="grid") # grid, dots, scanlines, none
