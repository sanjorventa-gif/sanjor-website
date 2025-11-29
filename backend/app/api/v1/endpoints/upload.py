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
        # Assuming the server is running on localhost:8000 for now, or use a relative path
        # Ideally, we should return a full URL or a path that the frontend can construct
        # Returning relative path for now: /static/uploads/filename
        return {"url": f"http://localhost:8000/static/uploads/{unique_filename}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Could not upload file: {str(e)}")
