from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Text, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.infrastructure.database import Base
import uuid

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(150), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Feature(Base):
    """
    Lista de funcionalidades (e.g. "Save the Date", "GPS") para mostrar en el Home 
    y para que las plantillas las referencien.
    """
    __tablename__ = "features"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    description = Column(String(255))
    icon_name = Column(String(50)) # e.g. "FaMapMarkerAlt"
    is_active = Column(Boolean, default=True)
    order = Column(Integer, default=0)

class WhyItem(Base):
    """
    Items de la sección 'Por qué WebInvita'.
    """
    __tablename__ = "why_items"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    text = Column(Text, nullable=False)
    icon_name = Column(String(50))
    order = Column(Integer, default=0)

class Template(Base):
    __tablename__ = "templates"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    slug = Column(String(100), unique=True, index=True)
    description = Column(Text, nullable=True)
    categories = Column(JSON, default=list) # List of category strings
    thumbnail_url = Column(String(255))
    glow_color = Column(String(20), default="#EC2A64") # New field for UI glow
    show_on_home = Column(Boolean, default=False) # New field: Carousel visibility
    
    # Defines the structure of data this template expects/supports
    config_schema = Column(JSON, nullable=False, default=dict)
    
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    invitations = relationship("Invitation", back_populates="template")

class Invitation(Base):
    __tablename__ = "invitations"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(64), unique=True, index=True, nullable=False)
    
    template_id = Column(Integer, ForeignKey("templates.id"))
    template = relationship("Template", back_populates="invitations")
    
    owner_email = Column(String(150), index=True)
    content = Column(JSON, nullable=False, default=dict)
    is_paid = Column(Boolean, default=False)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    google_pack = relationship("GooglePack", back_populates="invitation", uselist=False, cascade="all, delete-orphan")
    multimedia_items = relationship("Multimedia", back_populates="invitation", cascade="all, delete-orphan")

class Multimedia(Base):
    """
    Gestión de archivos multimedia (imágenes, videos) tanto para invitaciones
    de clientes como para uso general (galerías demo, home, etc).
    """
    __tablename__ = "multimedia"
    
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String(255), nullable=True)
    url = Column(String(500), nullable=False)
    file_type = Column(String(50), nullable=True) # 'image', 'video'
    
    # Optional link to invitation (if uploaded by client)
    invitation_id = Column(Integer, ForeignKey("invitations.id"), nullable=True)
    invitation = relationship("Invitation", back_populates="multimedia_items")
    
    # Classification/Tag for organizing (e.g. "demo_gallery", "hero_bg", "client_upload")
    classification = Column(String(50), default="general")
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class FAQ(Base):
    """
    Preguntas Frecuentes.
    """
    __tablename__ = "faqs"

    id = Column(Integer, primary_key=True, index=True)
    question = Column(String(255), nullable=False)
    answer = Column(Text, nullable=False)
    order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)

class News(Base):
    """
    Noticias o artículos del Blog.
    """
    __tablename__ = "news"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    slug = Column(String(200), unique=True, index=True)
    summary = Column(Text, nullable=True)
    content = Column(Text, nullable=False) # HTML or Markdown
    image_url = Column(String(255), nullable=True)
    
    is_published = Column(Boolean, default=True)
    published_at = Column(DateTime(timezone=True), server_default=func.now())
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class GooglePack(Base):
    __tablename__ = "google_packs"

    id = Column(Integer, primary_key=True, index=True)
    invitation_id = Column(Integer, ForeignKey("invitations.id"), unique=True)
    invitation = relationship("Invitation", back_populates="google_pack")
    
    drive_folder_id = Column(String(100), nullable=True)
    drive_folder_url = Column(String(255), nullable=True)
    
    # RSVP
    rsvp_form_id = Column(String(100), nullable=True)
    rsvp_form_url = Column(String(255), nullable=True)
    rsvp_form_edit_url = Column(String(255), nullable=True)
    rsvp_sheet_id = Column(String(100), nullable=True)
    rsvp_sheet_url = Column(String(255), nullable=True)
    
    # Songs
    songs_form_id = Column(String(100), nullable=True)
    songs_form_url = Column(String(255), nullable=True)
    songs_form_edit_url = Column(String(255), nullable=True)
    songs_sheet_id = Column(String(100), nullable=True)
    songs_sheet_url = Column(String(255), nullable=True)
    
    status = Column(String(50), default="pending") # pending, success, failed
    error_message = Column(Text, nullable=True)
    
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
