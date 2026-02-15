
import uuid
from typing import List, Optional
from app.presentation.schemas import InvitationCreate, TemplateCreate
from app.infrastructure.models import Invitation, Template
from app.infrastructure.repositories import InvitationRepository, TemplateRepository

class InvitationService:
    def __init__(self, repo: InvitationRepository):
        self.repo = repo

    async def create_invitation(self, data: InvitationCreate) -> Invitation:
        # Generate slug from content
        import random
        import string
        import re

        content = data.content
        # Try to find a name source
        base_name = "evento"
        if content.get("mainNames"):
            base_name = content.get("mainNames")
        elif content.get("eventName"):
            base_name = content.get("eventName")
        elif content.get("name"):
            base_name = content.get("name")
        elif content.get("spouse1Name") and content.get("spouse2Name"):
            base_name = f"{content.get('spouse1Name')}-y-{content.get('spouse2Name')}"

        # Normalize slug
        # Convert to string, lower, replace spaces with hyphens, remove non-alphanumeric
        slug_base = str(base_name).lower().strip()
        slug_base = re.sub(r'\s+', '-', slug_base)
        slug_base = re.sub(r'[^a-z0-9\-]', '', slug_base)
        
        if not slug_base:
            slug_base = "invitacion"

        # Append random digits to ensure uniqueness
        suffix = ''.join(random.choices(string.digits, k=4))
        slug = f"{slug_base}-{suffix}"
        
        invitation = Invitation(
            slug=slug,
            template_id=data.template_id,
            owner_email=data.owner_email,
            content=data.content,
            is_paid=False # Default
        )
        return await self.repo.create(invitation)

    async def get_invitation_public(self, slug: str) -> Optional[Invitation]:
        invitation = await self.repo.get_by_slug(slug)
        if invitation and invitation.google_pack and invitation.google_pack.status == "success":
            # Inject Google Pack URLs into content for frontend usage
            pack = invitation.google_pack
            content = dict(invitation.content)
            
            if pack.rsvp_form_url:
                content["rsvpUrl"] = pack.rsvp_form_url
                content["rsvpContact"] = pack.rsvp_form_url
            
            if pack.songs_form_url:
                content["playlistUrl"] = pack.songs_form_url
                content["musicFormUrl"] = pack.songs_form_url
                content["songSuggestionUrl"] = pack.songs_form_url
            
            # Update the object attribute (in-memory only, not saved to DB unless verified)
            # Since we return this object, the Pydantic model will serialize this modified content.
            # However, typically SQLAlchemy models use instrumentation. Assigning a new dict works.
            invitation.content = content
            
        return invitation

class TemplateService:
    def __init__(self, repo: TemplateRepository):
        self.repo = repo

    async def list_templates(self) -> List[Template]:
        return await self.repo.get_all()
        
    async def create_template(self, data: TemplateCreate) -> Template:
        template = Template(
            name=data.name,
            description=data.description,
            category=data.category,
            thumbnail_url=data.thumbnail_url,
            config_schema=data.config_schema,
            is_active=True
        )
        return await self.repo.create(template)
