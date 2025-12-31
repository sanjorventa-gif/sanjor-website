from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, models, schemas
from app.api import deps
from app.models.form import Form
from app.models.form_submission import FormSubmission
from app.core.email import send_email
from app.core.config import settings

router = APIRouter()

# --- Public Endpoints ---

@router.get("/", response_model=List[schemas.Form])
def read_forms(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve active forms (Public).
    """
    forms = db.query(Form).filter(Form.is_active == True).offset(skip).limit(limit).all()
    return forms

@router.get("/{slug}", response_model=schemas.Form)
def read_form_by_slug(
    slug: str,
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Get form definition by slug (Public).
    """
    form = db.query(Form).filter(Form.slug == slug, Form.is_active == True).first()
    if not form:
        raise HTTPException(status_code=404, detail="Form not found")
    return form

@router.post("/{slug}/submit", response_model=schemas.FormSubmission)
def submit_form(
    slug: str,
    submission_in: schemas.FormSubmissionCreate,
    db: Session = Depends(deps.get_db),
) -> Any:
    """
    Submit a form (Public).
    """
    form = db.query(Form).filter(Form.slug == slug, Form.is_active == True).first()
    if not form:
        raise HTTPException(status_code=404, detail="Form not found")
    
    submission = FormSubmission(
        form_id=form.id,
        data=submission_in.data
    )
    db.add(submission)
    db.commit()
    db.refresh(submission)

    # -------------------------
    # Send Email Notifications
    # -------------------------
    try:
        # Extract email from submission data if exists (for confirmation)
        user_email = None
        # Try common keys
        for key in ['email', 'Email', 'correo', 'Correo']:
            if key in submission_in.data and isinstance(submission_in.data[key], str):
                user_email = submission_in.data[key]
                break

        # 1. To Admin
        send_email(
            email_to=settings.EMAIL_TO_ADMIN,
            subject=f"Nuevo Envío: {form.title}",
            template_name="email/submission_notification.html",
            environment={
                "form_title": form.title,
                "data": submission_in.data
            }
        )

        # 2. To User
        if user_email:
            send_email(
                email_to=user_email,
                subject=f"Recibimos tu formulario: {form.title}",
                template_name="email/submission_confirmation.html",
                environment={
                    "form_title": form.title
                }
            )

    except Exception as e:
        print(f"Error sending form emails: {e}")

    return submission

# --- Admin Endpoints ---

@router.post("/", response_model=schemas.Form)
def create_form(
    *,
    db: Session = Depends(deps.get_db),
    form_in: schemas.FormCreate,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Create new form (Admin).
    """
    # Check if slug exists
    existing_form = db.query(Form).filter(Form.slug == form_in.slug).first()
    if existing_form:
        raise HTTPException(status_code=400, detail="Form with this slug already exists")

    form = Form(
        title=form_in.title,
        slug=form_in.slug,
        description=form_in.description,
        fields=[field.dict() for field in form_in.fields], # Store as JSON
        is_active=form_in.is_active
    )
    db.add(form)
    db.commit()
    db.refresh(form)
    return form

@router.put("/{id}", response_model=schemas.Form)
def update_form(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    form_in: schemas.FormUpdate,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Update a form (Admin).
    """
    form = db.query(Form).filter(Form.id == id).first()
    if not form:
        raise HTTPException(status_code=404, detail="Form not found")
    
    update_data = form_in.dict(exclude_unset=True)
    if 'fields' in update_data:
        update_data['fields'] = [field.dict() for field in update_data['fields']]

    for field, value in update_data.items():
        setattr(form, field, value)

    db.add(form)
    db.commit()
    db.refresh(form)
    return form

@router.delete("/{id}", response_model=schemas.Form)
def delete_form(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Delete a form (Admin).
    """
    form = db.query(Form).filter(Form.id == id).first()
    if not form:
        raise HTTPException(status_code=404, detail="Form not found")
    
    # Delete submissions first (or use cascade in model)
    db.query(FormSubmission).filter(FormSubmission.form_id == id).delete()
    
    db.delete(form)
    db.commit()
    return form

@router.get("/{id}/submissions", response_model=List[schemas.FormSubmission])
def read_form_submissions(
    id: int,
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Get submissions for a form (Admin).
    """
    form = db.query(Form).filter(Form.id == id).first()
    if not form:
        raise HTTPException(status_code=404, detail="Form not found")
        
    submissions = db.query(FormSubmission).filter(FormSubmission.form_id == id).offset(skip).limit(limit).all()
    return submissions
