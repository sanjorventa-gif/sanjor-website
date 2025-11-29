from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, models, schemas
from app.api import deps

router = APIRouter()

@router.get("/", response_model=List[schemas.CarouselItem])
def read_carousel_items(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve carousel items.
    """
    items = crud.carousel.get_multi(db, skip=skip, limit=limit)
    # Sort by order manually if DB doesn't support it easily in base CRUD, 
    # but base CRUD usually just does limit/offset. 
    # Let's sort in python for now or rely on insertion order if not specified.
    # Better: sort by 'order' field.
    items.sort(key=lambda x: x.order)
    items.sort(key=lambda x: x.order)
    return items

@router.get("/{id}", response_model=schemas.CarouselItem)
def read_carousel_item(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
) -> Any:
    """
    Get carousel item by ID.
    """
    item = crud.carousel.get(db=db, id=id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return item

@router.post("/", response_model=schemas.CarouselItem)
def create_carousel_item(
    *,
    db: Session = Depends(deps.get_db),
    item_in: schemas.CarouselItemCreate,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Create new carousel item.
    """
    item = crud.carousel.create(db=db, obj_in=item_in)
    return item

@router.put("/{id}", response_model=schemas.CarouselItem)
def update_carousel_item(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    item_in: schemas.CarouselItemUpdate,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Update a carousel item.
    """
    item = crud.carousel.get(db=db, id=id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    item = crud.carousel.update(db=db, db_obj=item, obj_in=item_in)
    return item

@router.delete("/{id}", response_model=schemas.CarouselItem)
def delete_carousel_item(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Delete a carousel item.
    """
    item = crud.carousel.get(db=db, id=id)
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    item = crud.carousel.remove(db=db, id=id)
    return item
