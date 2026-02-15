from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import IntegrityError

from app.infrastructure.database import get_db, SessionLocal
from app.infrastructure.repositories import InvitationRepository
from app.application.services import InvitationService
from app.application.services.google_service import google_service
from app.presentation.schemas import InvitationDTO, InvitationCreate, InvitationPublicDTO

router = APIRouter()

async def get_invitation_service(db: AsyncSession = Depends(get_db)) -> InvitationService:
    return InvitationService(InvitationRepository(db))

async def run_google_integration(invitation_id: int):
    """
    Background task wrapper to run Google integration with its own session.
    """
    async with SessionLocal() as db:
        await google_service.create_pro_google_pack(db, invitation_id)

@router.post("", response_model=InvitationDTO, status_code=status.HTTP_201_CREATED)
async def create_invitation(
    data: InvitationCreate,
    background_tasks: BackgroundTasks,
    service: InvitationService = Depends(get_invitation_service)
):
    """
    Create a new invitation (Demo by default).
    Triggers Google Form creation if features are enabled.
    """
    # Sanitize content to fix localhost URLs from previous frontend state
    def sanitize_urls(obj):
        if isinstance(obj, str):
            # Replace localhost:8000 and simple localhost just in case
            return obj.replace("http://localhost:8000", "https://webinvita.onrender.com").replace("http://localhost", "https://webinvita.onrender.com")
        if isinstance(obj, list):
            return [sanitize_urls(i) for i in obj]
        if isinstance(obj, dict):
            return {k: sanitize_urls(v) for k, v in obj.items()}
        return obj
    
    # Apply sanitization to the content dict
    if data.content:
        data.content = sanitize_urls(data.content)

    try:
        invitation = await service.create_invitation(data)
        background_tasks.add_task(run_google_integration, invitation.id)
        
        # PREVENT MissingGreenlet Error:
        # Convert to dict manually to avoid Pydantic triggering SQLAlchemy lazy loading on 'google_pack'
        invitation_dict = invitation.__dict__.copy()
        invitation_dict["google_pack"] = None
        invitation_dict.pop("_sa_instance_state", None)
        
        return InvitationDTO(**invitation_dict)
    except IntegrityError as e:
        print(f"Integrity Error: {e}")
        raise HTTPException(status_code=400, detail="Error creating invitation. Possibly invalid template ID or duplicate slug.")
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

@router.get("/{slug}", response_model=InvitationPublicDTO)
async def get_invitation(
    slug: str,
    service: InvitationService = Depends(get_invitation_service)
):
    """
    Get public invitation by slug.
    Frontend should check `is_paid` to determine if it shows watermarks or upgrade CTA.
    """
    invitation = await service.get_invitation_public(slug)
    if not invitation:
        raise HTTPException(status_code=404, detail="Invitation not found")
    
    return invitation
