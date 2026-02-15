from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.infrastructure.models import Template, Invitation
from typing import List, Optional

class TemplateRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_all(self) -> List[Template]:
        result = await self.session.execute(select(Template).where(Template.is_active == True))
        return result.scalars().all()

    async def get_by_id(self, id: int) -> Optional[Template]:
        result = await self.session.execute(select(Template).where(Template.id == id))
        return result.scalar_one_or_none()

    async def create(self, template: Template) -> Template:
        self.session.add(template)
        await self.session.commit()
        await self.session.refresh(template)
        return template

class InvitationRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def create(self, invitation: Invitation) -> Invitation:
        self.session.add(invitation)
        await self.session.commit()
        await self.session.refresh(invitation)
        return invitation

    async def get_by_slug(self, slug: str) -> Optional[Invitation]:
        # Eager load template
        stmt = select(Invitation).where(Invitation.slug == slug).join(Invitation.template)
        # We need to explicitly include the joined relation if we access it
        # Actually in asyncio, implicit generic loads fail. We should use select options if needed, 
        # but here we can rely on awaitable attributes if configured or explicit join load.
        # For simplicity, let's use selectinload
        from sqlalchemy.orm import selectinload
        stmt = stmt.options(selectinload(Invitation.template), selectinload(Invitation.google_pack))
        
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()
