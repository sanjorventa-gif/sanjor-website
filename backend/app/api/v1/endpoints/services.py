from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from app import models, schemas
from app.api import deps
from app.core.recaptcha import verify_recaptcha
from app.core.email import send_email
from app.core.config import settings

router = APIRouter()

# --- Service Requests ---

@router.post("/service-requests", response_model=schemas.ServiceRequest)
def create_service_request(
    *,
    db: Session = Depends(deps.get_db),
    request_in: schemas.ServiceRequestCreate,
    current_user: models.User | None = Depends(deps.get_current_user_optional),
    background_tasks: BackgroundTasks
) -> Any:
    """
    Create new service request (Public).
    """
    verify_recaptcha(request_in.recaptcha_token)
    
    obj_in_data = request_in.dict()
    del obj_in_data['recaptcha_token']
    
    if current_user:
        obj_in_data['user_id'] = current_user.id
    
    db_obj = models.ServiceRequest(**obj_in_data)
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)

    # Convert to dict for template
    email_data = {
        "name": db_obj.name,
        "last_name": db_obj.last_name,
        "company": db_obj.company,
        "email": db_obj.email,
        "phone": db_obj.phone,
        "city": db_obj.city,
        "province": db_obj.province,
        "country": db_obj.country,
        "rubro": db_obj.rubro,
        "work_area": db_obj.work_area,
        "stove_model": db_obj.stove_model,
        "serial_number": db_obj.serial_number,
        "purchase_date": db_obj.purchase_date,
        "problem_description": db_obj.problem_description,
        "request_id": db_obj.id
    }

    # Send Notification to Admin
    background_tasks.add_task(
        send_email,
        email_to=settings.EMAIL_TO_ADMIN,
        subject=f"Nueva Solicitud de Servicio - {db_obj.company} ({db_obj.name} {db_obj.last_name})",
        template_name="email/service_notification.html",
        environment=email_data,
        reply_to=db_obj.email
    )

    # Send Confirmation to User
    background_tasks.add_task(
        send_email,
        email_to=db_obj.email,
        subject="Solicitud de Servicio Recibida - SAN JOR",
        template_name="email/service_confirmation.html",
        environment=email_data
    )

    return db_obj

@router.get("/service-requests", response_model=List[schemas.ServiceRequest])
def read_service_requests(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve service requests (Admin or Service Technician).
    """
    if not current_user.is_superuser and current_user.role != models.UserRole.SERVICIO_TECNICO:
        raise HTTPException(status_code=400, detail="Not enough privileges")
    return db.query(models.ServiceRequest).offset(skip).limit(limit).all()

@router.get("/service-requests/me", response_model=List[schemas.ServiceRequest])
def read_my_service_requests(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve service requests for the current user.
    """
    return db.query(models.ServiceRequest).filter(models.ServiceRequest.user_id == current_user.id).offset(skip).limit(limit).all()

@router.put("/service-requests/{id}/status", response_model=schemas.ServiceRequest)
def update_service_request_status(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    status_in: schemas.ServiceRequestUpdateStatus,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Update service request status (Admin or Service Technician).
    """
    if not current_user.is_superuser and current_user.role != models.UserRole.SERVICIO_TECNICO:
        raise HTTPException(status_code=400, detail="Not enough privileges")
    obj = db.query(models.ServiceRequest).get(id)
    if not obj:
        raise HTTPException(status_code=404, detail="Service request not found")
    
    obj.status = status_in.status
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj

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
    type: str = "standard",
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve warranty registrations (Admin or Service Technician).
    """
    if not current_user.is_superuser and current_user.role != models.UserRole.SERVICIO_TECNICO:
        raise HTTPException(status_code=400, detail="Not enough privileges")
    
    query = db.query(models.WarrantyRegistration)
    if type:
        query = query.filter(models.WarrantyRegistration.registration_type == type)
    return query.offset(skip).limit(limit).all()

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
