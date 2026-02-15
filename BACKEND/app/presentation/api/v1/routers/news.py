from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List

from app.infrastructure.database import get_db
from app.infrastructure.models import News
from app.presentation.schemas import NewsDTO

router = APIRouter()

@router.get("/", response_model=List[NewsDTO])
async def get_published_news(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(News).where(News.is_published == True).order_by(News.created_at.desc()))
    return result.scalars().all()

@router.get("/{slug}", response_model=NewsDTO)
async def get_news_article(slug: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(News).where(News.slug == slug, News.is_published == True))
    item = result.scalar_one_or_none()
    if not item:
        raise HTTPException(status_code=404, detail="Article not found")
    return item
