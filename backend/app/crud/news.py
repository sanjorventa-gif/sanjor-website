import re
import unicodedata
from typing import Any, Dict, Union
from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.models.news import News
from app.schemas.news import NewsCreate, NewsUpdate

def slugify(value: str) -> str:
    """
    Convert to ASCII. Convert spaces or repeated dashes to single dashes.
    Remove characters that aren't alphanumerics, underscores, or hyphens.
    Convert to lowercase. Strip leading and trailing whitespace, dashes, and underscores.
    """
    value = str(value)
    value = unicodedata.normalize('NFKD', value).encode('ascii', 'ignore').decode('ascii')
    value = re.sub(r'[^\w\s-]', '', value.lower())
    return re.sub(r'[-\s]+', '-', value).strip('-_')

class CRUDNews(CRUDBase[News, NewsCreate, NewsUpdate]):
    def create(self, db: Session, *, obj_in: NewsCreate) -> News:
        obj_in_data = obj_in.model_dump()
        
        # Generate slug if not present
        if not obj_in_data.get("slug"):
            slug = slugify(obj_in_data["title"])
            # Ensure unique
            counter = 1
            original_slug = slug
            while db.query(News).filter(News.slug == slug).first():
                slug = f"{original_slug}-{counter}"
                counter += 1
            obj_in_data["slug"] = slug

        db_obj = News(**obj_in_data)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self,
        db: Session,
        *,
        db_obj: News,
        obj_in: Union[NewsUpdate, Dict[str, Any]]
    ) -> News:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.model_dump(exclude_unset=True)

        if "title" in update_data and "slug" not in update_data:
            slug = slugify(update_data["title"])
            # Ensure unique, excluding current object
            counter = 1
            original_slug = slug
            while db.query(News).filter(News.slug == slug).filter(News.id != db_obj.id).first():
                slug = f"{original_slug}-{counter}"
                counter += 1
            update_data["slug"] = slug
        
        return super().update(db, db_obj=db_obj, obj_in=update_data)

news = CRUDNews(News)
