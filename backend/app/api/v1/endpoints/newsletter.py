from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, models, schemas
from app.api import deps

router = APIRouter()

@router.post("/", response_model=schemas.Newsletter)
def create_newsletter_subscription(
    *,
    db: Session = Depends(deps.get_db),
    newsletter_in: schemas.NewsletterCreate,
) -> Any:
    """
    Subscribe to newsletter.
    """
    # Check if exists
    existing = db.query(models.Newsletter).filter(models.Newsletter.email == newsletter_in.email).first()
    if existing:
        return existing
        
    newsletter = crud.newsletter.create(db, obj_in=newsletter_in)
    return newsletter

@router.get("/", response_model=List[schemas.Newsletter])
def read_newsletters(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Retrieve newsletter subscribers.
    """
    """
    Retrieve newsletter subscribers.
    """
    from datetime import datetime
    
    # Get standalone newsletter subscribers
    subscribers = crud.newsletter.get_multi(db, skip=skip, limit=limit)
    
    # Get users subscribed
    users = db.query(models.User).filter(models.User.newsletter_subscribed == True).offset(skip).limit(limit).all()
    
    results = []
    
    # Add subscribers
    for sub in subscribers:
        results.append(sub)
        
    # Add users (mapped to Newsletter schema structure)
    for user in users:
        # Avoid duplicates if email exists in both (unlikely but possible)
        if not any(r.email == user.email for r in results):
             # Create a dummy object or dict that matches schema
             results.append(schemas.Newsletter(
                 id=user.id + 100000, # Offset ID to avoid collision with standard subscribers
                 email=user.email,
                 created_at=datetime.utcnow() # User doesn't track subscription date, using now or dummy
             ))
             
    return results

@router.delete("/{id}", response_model=schemas.Newsletter)
def delete_newsletter(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Delete a newsletter subscription.
    """
    newsletter = crud.newsletter.get(db, id=id)
    if not newsletter:
        raise HTTPException(status_code=404, detail="Newsletter subscription not found")
    newsletter = crud.newsletter.remove(db=db, id=id)
    return newsletter
