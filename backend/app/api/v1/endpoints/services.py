from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas
from app.api import deps
from app.core.recaptcha import verify_recaptcha

router = APIRouter()

# --- Service Requests ---

@router.post("/service-requests", response_model=schemas.ServiceRequest)
def create_service_request(
    *,
    db: Session = Depends(deps.get_db),
    request_in: schemas.ServiceRequestCreate,
) -> Any:
    """
    Create new service request (Public).
    """
    verify_recaptcha(request_in.recaptcha_token)
    
    obj_in_data = request_in.dict()
    del obj_in_data['recaptcha_token']
    
    db_obj = models.ServiceRequest(**obj_in_data)
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@router.get("/service-requests", response_model=List[schemas.ServiceRequest])
def read_service_requests(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Retrieve service requests (Admin only).
    """
    return db.query(models.ServiceRequest).offset(skip).limit(limit).all()

@router.delete("/service-requests/{id}", response_model=schemas.ServiceRequest)
def delete_service_request(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Delete service request (Admin only).
    """
    obj = db.query(models.ServiceRequest).get(id)
    if not obj:
        raise HTTPException(status_code=404, detail="Service request not found")
    db.delete(obj)
    db.commit()
    return obj

# --- Warranty Registrations ---

@router.post("/warranty-registrations", response_model=schemas.WarrantyRegistration)
def create_warranty_registration(
    *,
    db: Session = Depends(deps.get_db),
    registration_in: schemas.WarrantyRegistrationCreate,
) -> Any:
    """
    Create new warranty registration (Public).
    """
    verify_recaptcha(registration_in.recaptcha_token)

    obj_in_data = registration_in.dict()
    del obj_in_data['recaptcha_token']

    db_obj = models.WarrantyRegistration(**obj_in_data)
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

@router.get("/warranty-registrations", response_model=List[schemas.WarrantyRegistration])
def read_warranty_registrations(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Retrieve warranty registrations (Admin only).
    """
    return db.query(models.WarrantyRegistration).offset(skip).limit(limit).all()

@router.delete("/warranty-registrations/{id}", response_model=schemas.WarrantyRegistration)
def delete_warranty_registration(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Delete warranty registration (Admin only).
    """
    obj = db.query(models.WarrantyRegistration).get(id)
    if not obj:
        raise HTTPException(status_code=404, detail="Warranty registration not found")
    db.delete(obj)
    db.commit()
    return obj
