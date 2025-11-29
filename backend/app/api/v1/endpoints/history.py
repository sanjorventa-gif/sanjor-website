from typing import Any, List, Dict

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps

router = APIRouter()

@router.get("/", response_model=List[schemas.History])
def read_history(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve history entries.
    """
    history = crud.history.get_multi(db, skip=skip, limit=limit)
    return history

@router.post("/", response_model=schemas.History)
def create_history(
    *,
    db: Session = Depends(deps.get_db),
    history_in: schemas.HistoryCreate,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Create new history entry.
    """
    history = crud.history.create(db=db, obj_in=history_in)
    return history

@router.put("/reorder", response_model=List[schemas.History])
def reorder_history(
    *,
    db: Session = Depends(deps.get_db),
    ordered_history: List[Dict[str, int]], # List of {id: int, order: int}
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Reorder history entries.
    """
    updated_entries = []
    for item in ordered_history:
        entry = crud.history.get(db=db, id=item["id"])
        if entry:
            updated_entry = crud.history.update(db=db, db_obj=entry, obj_in={"order": item["order"]})
            updated_entries.append(updated_entry)
    return updated_entries

@router.put("/{id}", response_model=schemas.History)
def update_history(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    history_in: schemas.HistoryUpdate,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Update a history entry.
    """
    history = crud.history.get(db=db, id=id)
    if not history:
        raise HTTPException(status_code=404, detail="History entry not found")
    history = crud.history.update(db=db, db_obj=history, obj_in=history_in)
    return history

@router.delete("/{id}", response_model=schemas.History)
def delete_history(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Delete a history entry.
    """
    history = crud.history.get(db=db, id=id)
    if not history:
        raise HTTPException(status_code=404, detail="History entry not found")
    history = crud.history.remove(db=db, id=id)
    return history
