from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Body
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from typing import List, Optional
import shutil
import os
import uuid

from app.infrastructure.database import get_db
from app.infrastructure.models import Template, Feature, WhyItem, Invitation, FAQ, News, Multimedia
from app.presentation.api.deps import get_current_active_superuser
from app.presentation.schemas import (
    TemplateDTO, TemplateCreate, 
    FeatureDTO, FeatureCreate, 
    WhyItemDTO, WhyItemCreate,
    InvitationDTO, InvitationCreate,
    FAQDTO, FAQCreate,
    NewsDTO, NewsCreate,
    MultimediaDTO, MultimediaCreate
)

router = APIRouter()

class InvitationAdminDTO(InvitationDTO):
    template: Optional[TemplateDTO] = None

# --- Templates CRUD ---
@router.post("/templates", response_model=TemplateDTO)
async def create_template_admin(
    item: TemplateCreate,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_active_superuser)
):
    db_item = Template(**item.model_dump(), is_active=True)
    db.add(db_item)
    await db.commit()
    await db.refresh(db_item)
    return db_item

@router.put("/templates/{id}", response_model=TemplateDTO)
async def update_template_admin(
    id: int,
    item: TemplateCreate,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_active_superuser)
):
    result = await db.execute(select(Template).where(Template.id == id))
    db_item = result.scalar_one_or_none()
    if not db_item:
        raise HTTPException(status_code=404, detail="Template not found")
    
    for key, value in item.model_dump().items():
        setattr(db_item, key, value)
    
    await db.commit()
    await db.refresh(db_item)
    return db_item

@router.delete("/templates/{id}")
async def delete_template_admin(
    id: int,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_active_superuser)
):
    result = await db.execute(select(Template).where(Template.id == id))
    item = result.scalar_one_or_none()
    if not item:
        raise HTTPException(status_code=404, detail="Not found")
    
    await db.delete(item)
    await db.commit()
    return {"status": "deleted"}

# --- Features CRUD ---
@router.get("/features", response_model=List[FeatureDTO])
async def list_features(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Feature).where(Feature.is_active == True).order_by(Feature.order))
    return result.scalars().all()

@router.post("/features", response_model=FeatureDTO)
async def create_feature(
    item: FeatureCreate,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_active_superuser)
):
    db_item = Feature(**item.model_dump(), is_active=True)
    db.add(db_item)
    await db.commit()
    await db.refresh(db_item)
    return db_item

@router.put("/features/{id}", response_model=FeatureDTO)
async def update_feature(
    id: int,
    item: FeatureCreate,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_active_superuser)
):
    result = await db.execute(select(Feature).where(Feature.id == id))
    db_item = result.scalar_one_or_none()
    if not db_item:
        raise HTTPException(status_code=404, detail="Feature not found")
    
    for key, value in item.model_dump().items():
        setattr(db_item, key, value)
    
    await db.commit()
    await db.refresh(db_item)
    return db_item

@router.delete("/features/{id}")
async def delete_feature(
    id: int,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_active_superuser)
):
    result = await db.execute(select(Feature).where(Feature.id == id))
    item = result.scalar_one_or_none()
    if not item:
        raise HTTPException(status_code=404, detail="Not found")
    await db.delete(item)
    await db.commit()
    return {"status": "deleted"}

# --- WhyItems CRUD ---
@router.get("/why-items", response_model=List[WhyItemDTO])
async def list_why_items(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(WhyItem).order_by(WhyItem.order))
    return result.scalars().all()

@router.post("/why-items", response_model=WhyItemDTO)
async def create_why_item(
    item: WhyItemCreate,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_active_superuser)
):
    db_item = WhyItem(**item.model_dump())
    db.add(db_item)
    await db.commit()
    await db.refresh(db_item)
    return db_item

@router.put("/why-items/{id}", response_model=WhyItemDTO)
async def update_why_item(
    id: int,
    item: WhyItemCreate,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_active_superuser)
):
    result = await db.execute(select(WhyItem).where(WhyItem.id == id))
    db_item = result.scalar_one_or_none()
    if not db_item:
        raise HTTPException(status_code=404, detail="WhyItem not found")

    for key, value in item.model_dump().items():
        setattr(db_item, key, value)

    await db.commit()
    await db.refresh(db_item)
    return db_item

@router.delete("/why-items/{id}")
async def delete_why_item(
    id: int,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_active_superuser)
):
    result = await db.execute(select(WhyItem).where(WhyItem.id == id))
    item = result.scalar_one_or_none()
    if not item:
        raise HTTPException(status_code=404, detail="Not found")
    await db.delete(item)
    await db.commit()
    return {"status": "deleted"}

# --- Invitations CRUD ---
@router.post("/invitations", response_model=InvitationAdminDTO)
async def create_invitation_admin(
    item: InvitationCreate,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_active_superuser)
):
    slug = uuid.uuid4().hex[:10]
    db_item = Invitation(
        slug=slug,
        template_id=item.template_id,
        owner_email=item.owner_email,
        content=item.content,
        is_paid=False 
    )
    db.add(db_item)
    await db.commit()
    await db.refresh(db_item)
    
    # Re-fetch to load relationship
    result = await db.execute(select(Invitation).options(selectinload(Invitation.template)).where(Invitation.id == db_item.id))
    return result.scalar_one()

@router.get("/invitations", response_model=List[InvitationAdminDTO])
async def list_invitations(
    q: str = None,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_active_superuser)
):
    query = select(Invitation).options(selectinload(Invitation.template), selectinload(Invitation.google_pack)).order_by(Invitation.created_at.desc())
    
    if q:
        # Search by owner_email or slug
        query = query.where(
            (Invitation.owner_email.ilike(f"%{q}%")) | 
            (Invitation.slug.ilike(f"%{q}%"))
        )
        
    result = await db.execute(query)
    return result.scalars().all()

@router.put("/invitations/{id}")
async def update_invitation_content(
    id: int,
    item: InvitationCreate, # Reusing Create schema which has content and owner_email
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_active_superuser)
):
    result = await db.execute(select(Invitation).where(Invitation.id == id))
    db_item = result.scalar_one_or_none()
    if not db_item:
        raise HTTPException(status_code=404, detail="Invitation not found")
    
    # Update fields
    db_item.owner_email = item.owner_email
    db_item.content = item.content
    # template_id might change? let's allow it
    db_item.template_id = item.template_id
    
    await db.commit()
    await db.refresh(db_item)
    # We need to return it as AdminDTO so we need to reload the template
    # Or simplified return
    return db_item

@router.delete("/invitations/bulk")
async def delete_invitations_bulk(
    ids: List[int] = Body(...),
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_active_superuser)
):
    # Use delete with in_ clause
    stmt = select(Invitation).where(Invitation.id.in_(ids))
    result = await db.execute(stmt)
    items = result.scalars().all()
    
    if not items:
        return {"status": "no_items_found", "deleted_count": 0}
        
    for item in items:
        await db.delete(item)
        
    await db.commit()
    return {"status": "deleted", "deleted_count": len(items)}

@router.delete("/invitations/{id}")
async def delete_invitation(
    id: int,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_active_superuser)
):
    result = await db.execute(select(Invitation).where(Invitation.id == id))
    db_item = result.scalar_one_or_none()
    if not db_item:
        raise HTTPException(status_code=404, detail="Invitation not found")
    
    await db.delete(db_item)
    await db.commit()
    return {"status": "deleted"}

@router.patch("/invitations/{id}/status")
async def toggle_invitation_status(
    id: int,
    is_paid: bool,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_active_superuser)
):
    result = await db.execute(select(Invitation).where(Invitation.id == id))
    item = result.scalar_one_or_none()
    if not item:
        raise HTTPException(status_code=404, detail="Invitation not found")
    
    item.is_paid = is_paid
    await db.commit()
    await db.refresh(item)
    return {"status": "updated", "is_paid": item.is_paid}

@router.post("/upload")
async def upload_image(
    file: UploadFile = File(...),
    current_user = Depends(get_current_active_superuser)
):
    try:
        # Save to Backend Static folder
        upload_dir = os.path.join("app", "static", "uploads")
        
        if not os.path.exists(upload_dir):
            os.makedirs(upload_dir)
            
        file_ext = file.filename.split(".")[-1]
        filename = f"{uuid.uuid4()}.{file_ext}"
        file_path = os.path.join(upload_dir, filename)
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        return {"url": f"/static/uploads/{filename}"}
    except Exception as e:
        print(f"Error upload: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# --- FAQs CRUD ---
@router.get("/faqs", response_model=List[FAQDTO])
async def list_faqs(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(FAQ).order_by(FAQ.order))
    return result.scalars().all()

@router.post("/faqs", response_model=FAQDTO)
async def create_faq(
    item: FAQCreate,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_active_superuser)
):
    db_item = FAQ(**item.model_dump())
    db.add(db_item)
    await db.commit()
    await db.refresh(db_item)
    return db_item

@router.put("/faqs/{id}", response_model=FAQDTO)
async def update_faq(
    id: int,
    item: FAQCreate,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_active_superuser)
):
    result = await db.execute(select(FAQ).where(FAQ.id == id))
    db_item = result.scalar_one_or_none()
    if not db_item:
        raise HTTPException(status_code=404, detail="FAQ not found")
    
    for key, value in item.model_dump().items():
        setattr(db_item, key, value)
    
    await db.commit()
    await db.refresh(db_item)
    return db_item

@router.delete("/faqs/{id}")
async def delete_faq(
    id: int,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_active_superuser)
):
    result = await db.execute(select(FAQ).where(FAQ.id == id))
    item = result.scalar_one_or_none()
    if not item:
        raise HTTPException(status_code=404, detail="Not found")
    
    await db.delete(item)
    await db.commit()
    return {"status": "deleted"}

# --- News CRUD ---
@router.get("/news", response_model=List[NewsDTO])
async def list_news(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(News).order_by(News.created_at.desc()))
    return result.scalars().all()

@router.post("/news", response_model=NewsDTO)
async def create_news(
    item: NewsCreate,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_active_superuser)
):
    base_slug = item.title.lower().replace(" ", "-").replace("/", "").replace("?", "")
    if not base_slug:
        base_slug = uuid.uuid4().hex[:8]
    
    res = await db.execute(select(News).where(News.slug == base_slug))
    if res.scalar_one_or_none():
        base_slug = f"{base_slug}-{uuid.uuid4().hex[:4]}"

    db_item = News(**item.model_dump(), slug=base_slug)
    db.add(db_item)
    await db.commit()
    await db.refresh(db_item)
    return db_item

@router.put("/news/{id}", response_model=NewsDTO)
async def update_news(
    id: int,
    item: NewsCreate,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_active_superuser)
):
    result = await db.execute(select(News).where(News.id == id))
    db_item = result.scalar_one_or_none()
    if not db_item:
        raise HTTPException(status_code=404, detail="News not found")
    
    for key, value in item.model_dump().items():
        setattr(db_item, key, value)
    
    await db.commit()
    await db.refresh(db_item)
    return db_item

@router.delete("/news/{id}")
async def delete_news(
    id: int,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_active_superuser)
):
    result = await db.execute(select(News).where(News.id == id))
    item = result.scalar_one_or_none()
    if not item:
        raise HTTPException(status_code=404, detail="Not found")
    
    await db.delete(item)
    await db.commit()
    return {"status": "deleted"}

# --- Google Integration ---
from app.infrastructure.models import GooglePack

@router.post("/invitations/{id}/google-pack")
async def create_google_pack(
    id: int,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_active_superuser)
):
    # Trigger Google Pack Creation without forcing PRO status
    from app.application.services.google_service import google_service
    try:
        # Pass DB session to service
        pack = await google_service.create_pro_google_pack(db, id)
        return {
            "status": "success",
            "message": "Google Assets created successfully.",
            "google_pack_status": pack.status,
            "google_pack": {
                "drive_folder_url": pack.drive_folder_url,
                "rsvp_sheet_url": pack.rsvp_sheet_url,
                "songs_sheet_url": pack.songs_sheet_url
            }
        }
    except Exception as e:
        print(f"Error creating pack: {e}")
        return {
             "status": "error",
             "message": f"Google Assets failed: {str(e)}",
             "error": str(e)
        }

@router.get("/invitations/{id}/google-pack")
async def get_google_pack(
    id: int,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_active_superuser)
):
    result = await db.execute(select(GooglePack).where(GooglePack.invitation_id == id))
    pack = result.scalar_one_or_none()
    if not pack:
        raise HTTPException(status_code=404, detail="Google Pack not found for this invitation")
    
    return pack

# --- Multimedia CRUD ---
@router.get("/multimedia", response_model=List[MultimediaDTO])
async def list_multimedia(
    classification: Optional[str] = None,
    invitation_id: Optional[int] = None,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_active_superuser)
):
    query = select(Multimedia).order_by(Multimedia.created_at.desc())
    if classification:
        query = query.where(Multimedia.classification == classification)
    if invitation_id:
        query = query.where(Multimedia.invitation_id == invitation_id)
        
    result = await db.execute(query)
    return result.scalars().all()

@router.post("/multimedia", response_model=MultimediaDTO)
async def create_multimedia(
    file: UploadFile = File(...),
    classification: Optional[str] = "general",
    invitation_id: Optional[int] = None,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_active_superuser)
):
    # 1. Upload File
    try:
        upload_dir = os.path.join("app", "static", "uploads")
        if not os.path.exists(upload_dir):
            os.makedirs(upload_dir)
            
        file_ext = file.filename.split(".")[-1]
        unique_filename = f"{uuid.uuid4()}.{file_ext}"
        file_path = os.path.join(upload_dir, unique_filename)
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        file_url = f"/static/uploads/{unique_filename}"
        
        # 2. Create DB Record
        db_item = Multimedia(
            filename=unique_filename,
            url=file_url,
            file_type="image" if file_ext.lower() in ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'] else "video",
            classification=classification,
            invitation_id=invitation_id
        )
        db.add(db_item)
        await db.commit()
        await db.refresh(db_item)
        return db_item
        
    except Exception as e:
        print(f"Error uploading multimedia: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/multimedia/{id}")
async def delete_multimedia(
    id: int,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_active_superuser)
):
    result = await db.execute(select(Multimedia).where(Multimedia.id == id))
    item = result.scalar_one_or_none()
    if not item:
        raise HTTPException(status_code=404, detail="Not found")
    
    # Try to delete file from disk
    try:
        if item.filename:
             file_path = os.path.join("app", "static", "uploads", item.filename)
             if os.path.exists(file_path):
                 os.remove(file_path)
    except Exception as e:
        print(f"Error deleting file from disk: {e}")
    
    await db.delete(item)
    await db.commit()
    return {"status": "deleted"}
