from typing import Any
from fastapi import APIRouter, BackgroundTasks, Depends
from pydantic import EmailStr

from app import schemas
from app.core.email import send_email
from app.core.config import settings
from app.core.recaptcha import verify_recaptcha

router = APIRouter()

@router.post("/", status_code=200)
def contact_form(
    contact_in: schemas.ContactCreate,
    background_tasks: BackgroundTasks,
) -> Any:
    """
    Submit contact form.
    """
    if contact_in.recaptcha_token:
        verify_recaptcha(contact_in.recaptcha_token)
    
    email_data = contact_in.dict()
    
    # Notify Admin
    background_tasks.add_task(
        send_email,
        email_to=settings.EMAIL_TO_ADMIN,
        subject=f"Nuevo Contacto - {contact_in.company or 'Web'} ({contact_in.name} {contact_in.lastname or ''})",
        template_name="email/contact_notification.html",
        environment=email_data,
        reply_to=contact_in.email
    )

    # Confirm to User
    background_tasks.add_task(
        send_email,
        email_to=contact_in.email,
        subject="Mensaje Recibido - SAN JOR",
        template_name="email/contact_confirmation.html",
        environment=email_data
    )
    
    return {"msg": "Message sent"}
