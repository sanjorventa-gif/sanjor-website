from fastapi import APIRouter, UploadFile, File, HTTPException
import shutil
import os
import uuid
from typing import List

router = APIRouter()

UPLOAD_DIR = "app/static/uploads"

@router.post("/")
async def upload_file(file: UploadFile = File(...)):
    try:
        # Create unique filename
        file_extension = os.path.splitext(file.filename)[1]
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        file_path = os.path.join(UPLOAD_DIR, unique_filename)

        # Save file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # Return URL
        # Assuming localhost for now, but in prod this should be dynamic or env var
        url = f"http://localhost:8000/static/uploads/{unique_filename}"
        return {"url": url}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
