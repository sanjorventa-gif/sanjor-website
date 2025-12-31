from datetime import timedelta
from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app import crud, schemas, models
from app.api import deps
from app.core import security
from app.core.config import settings
from app.core.email import send_email

router = APIRouter()

@router.post("/login/access-token", response_model=schemas.Token)
def login_access_token(
    db: Session = Depends(deps.get_db), form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    try:
        print(f"Login attempt: {form_data.username} / {form_data.password}")
        user = crud.user.authenticate(
            db, email=form_data.username, password=form_data.password
        )
        if not user:
            raise HTTPException(status_code=400, detail="Incorrect email or password")
        if not crud.user.is_active(user):
            raise HTTPException(status_code=400, detail="Su cuenta está pendiente de aprobación. Le notificaremos cuando esté activa.")
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        return {
            "access_token": security.create_access_token(
                user.id, expires_delta=access_token_expires
            ),
            "token_type": "bearer",
        }
    except HTTPException:
        raise
    except Exception as e:
        print(f"Login error: {e}")
        raise HTTPException(status_code=500, detail=f"Login failed: {str(e)}")

@router.post("/test-token", response_model=schemas.User)
def test_token(current_user: schemas.User = Depends(deps.get_current_user)) -> Any:
    """
    Test access token
    """
    return current_user

@router.post("/register", response_model=schemas.User)
def register(
    *,
    db: Session = Depends(deps.get_db),
    user_in: schemas.UserCreate,
) -> Any:
    """
    Create new user without the need to be logged in.
    """
    user = crud.user.get_by_email(db, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this username already exists in the system.",
        )
    # Validar que no se intente crear un admin
    if user_in.role == models.UserRole.ADMIN:
        raise HTTPException(
            status_code=400,
            detail="Cannot register as admin.",
        )

    # Si el rol es None, forzar usuario nacional por defecto (seguridad)
    if not user_in.role:
        user_in.role = models.UserRole.USUARIO_NACIONAL

    # Lógica de activación:
    # Usuarios (nacional/internacional): Activos por defecto
    # Distribuidores: Inactivos por defecto (requieren aprobación)
    # Comparacion robusta (Enum o String)
    if user_in.role in [
        models.UserRole.DISTRIBUIDOR_NACIONAL, 
        models.UserRole.DISTRIBUIDOR_INTERNACIONAL,
        "distribuidor_nacional",
        "distribuidor_internacional"
    ]:
        user_in.is_active = False
    else:
        user_in.is_active = True
    
    user_in.is_superuser = False
    
    # Create user
    user = crud.user.create(db, obj_in=user_in)

    # -------------------------
    # Send Email Notifications
    # -------------------------
    try:
        # 1. To Admin
        send_email(
            email_to=settings.EMAIL_TO_ADMIN,
            subject=f"Nuevo Usuario Registrado - {user_in.full_name}",
            template_name="email/new_account_admin.html",
            environment={
                "full_name": user_in.full_name,
                "email": user_in.email,
                "role": user_in.role or "N/A",
                "company": user_in.company,
                "is_active": user_in.is_active
            }
        )

        # 2. To User (Welcome)
        send_email(
            email_to=user_in.email,
            subject="Bienvenido a SAN JOR",
            template_name="email/new_account.html",
            environment={
                "full_name": user_in.full_name,
                "is_active": user_in.is_active
            }
        )
    except Exception as e:
        print(f"Error sending registration emails: {e}")
        # Non-blocking error

    return user
