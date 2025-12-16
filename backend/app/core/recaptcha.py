import urllib.parse
import urllib.request
import json
from fastapi import HTTPException
from app.core.config import settings

def verify_recaptcha(token: str) -> bool:
    if not token:
        raise HTTPException(status_code=400, detail="reCAPTCHA token missing")

    url = "https://www.google.com/recaptcha/api/siteverify"
    data = urllib.parse.urlencode({
        "secret": settings.RECAPTCHA_SECRET_KEY,
        "response": token
    }).encode()

    try:
        req = urllib.request.Request(url, data=data)
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode())
    except Exception as e:
        print(f"Recaptcha verification connection error: {e}")
        raise HTTPException(status_code=500, detail="Recaptcha verification failed")

    if not result.get("success"):
        raise HTTPException(status_code=400, detail="reCAPTCHA verification failed")

    if result.get("score", 0) < 0.5:
        raise HTTPException(status_code=400, detail="reCAPTCHA score too low")

    return True
