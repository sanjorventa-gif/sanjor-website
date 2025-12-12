import shutil
import os
import uuid
from typing import Any
from fastapi import APIRouter, UploadFile, File, HTTPException
from app.core.config import settings

router = APIRouter()

UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))), "static", "uploads")
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

@router.post("/", response_model=dict)
async def upload_file(
    file: UploadFile = File(...)
) -> Any:
    """
    Upload a file.
    """
    try:
        # Generate unique filename
        file_extension = os.path.splitext(file.filename)[1]
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        file_path = os.path.join(UPLOAD_DIR, unique_filename)
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # Return URL
        # Use BACKEND_URL from settings to construct the full URL
        # This ensures it works in both dev (localhost) and prod (actual domain)
        return {"url": f"{settings.BACKEND_URL}/static/uploads/{unique_filename}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Could not upload file: {str(e)}")
