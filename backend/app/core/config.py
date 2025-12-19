from typing import List
from pydantic_settings import BaseSettings
from pydantic import AnyHttpUrl
from dotenv import load_dotenv
import os

load_dotenv(os.path.join(os.path.dirname(__file__), "../../../.env"))

class Settings(BaseSettings):
    PROJECT_NAME: str = "SAN JOR API"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    RECAPTCHA_SECRET_KEY: str
    
    # CORS
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []

    # Database
    SQLALCHEMY_DATABASE_URI: str

    # Uploads
    BACKEND_URL: str = "http://localhost:8000"

    # Email
    SMTP_HOST: str = "smtp.donweb.com" # Placeholder for DonWeb
    SMTP_PORT: int = 465 # SSL
    SMTP_USER: str = "info@sanjor.com.ar"
    SMTP_PASSWORD: str = "password"
    EMAILS_FROM_EMAIL: str = "info@sanjor.com.ar"
    EMAILS_FROM_NAME: str = "SAN JOR"
    EMAIL_TO_ADMIN: str = "info@sanjor.com.ar"

    class Config:
        case_sensitive = True
        env_file = "../../../.env"

settings = Settings()
