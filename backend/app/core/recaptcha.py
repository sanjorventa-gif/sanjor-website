import requests
from fastapi import HTTPException
from app.core.config import settings

def verify_recaptcha(token: str) -> bool:
    if not token:
        raise HTTPException(status_code=400, detail="reCAPTCHA token missing")

    response = requests.post(
        "https://www.google.com/recaptcha/api/siteverify",
        data={
            "secret": settings.RECAPTCHA_SECRET_KEY,
            "response": token
        }
    )

    result = response.json()

    if not result.get("success"):
        raise HTTPException(status_code=400, detail="reCAPTCHA verification failed")

    if result.get("score", 0) < 0.5:
        raise HTTPException(status_code=400, detail="reCAPTCHA score too low")

    return True
