from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, models, schemas
from app.api import deps

router = APIRouter()

@router.get("/", response_model=List[schemas.News])
def read_news(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve news.
    """
    news = crud.news.get_multi(db, skip=skip, limit=limit)
    return news

@router.post("/", response_model=schemas.News)
def create_news(
    *,
    db: Session = Depends(deps.get_db),
    news_in: schemas.NewsCreate,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Create new news item.
    """
    news = crud.news.create(db=db, obj_in=news_in)
    return news

@router.put("/{id}", response_model=schemas.News)
def update_news(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    news_in: schemas.NewsUpdate,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Update a news item.
    """
    news = crud.news.get(db=db, id=id)
    if not news:
        raise HTTPException(status_code=404, detail="News item not found")
    news = crud.news.update(db=db, db_obj=news, obj_in=news_in)
    return news

@router.get("/{id}", response_model=schemas.News)
def read_news_item(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
) -> Any:
    """
    Get news item by ID.
    """
    news = crud.news.get(db=db, id=id)
    if not news:
        raise HTTPException(status_code=404, detail="News item not found")
    return news

@router.get("/slug/{slug}", response_model=schemas.News)
def read_news_item_by_slug(
    *,
    db: Session = Depends(deps.get_db),
    slug: str,
) -> Any:
    """
    Get news item by Slug.
    """
    news = db.query(models.News).filter(models.News.slug == slug).first()
    if not news:
        raise HTTPException(status_code=404, detail="News item not found")
    return news

@router.delete("/{id}", response_model=schemas.News)
def delete_news(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Delete a news item.
    """
    news = crud.news.get(db=db, id=id)
    if not news:
        raise HTTPException(status_code=404, detail="News item not found")
    news = crud.news.remove(db=db, id=id)
    return news
