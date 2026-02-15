from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.infrastructure.database import get_db
from app.infrastructure.repositories import TemplateRepository
from app.application.services import TemplateService
from app.presentation.schemas import TemplateDTO, TemplateCreate

router = APIRouter()

async def get_template_service(db: AsyncSession = Depends(get_db)) -> TemplateService:
    return TemplateService(TemplateRepository(db))

@router.get("", response_model=List[TemplateDTO])
async def list_templates(
    service: TemplateService = Depends(get_template_service)
):
    """
    List all active templates.
    """
    return await service.list_templates()

@router.post("/", response_model=TemplateDTO, status_code=201)
async def create_template(
    template: TemplateCreate,
    service: TemplateService = Depends(get_template_service)
):
    """
    Create a new template (Admin only - TODO: Auth).
    """
    return await service.create_template(template)
