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

    class Config:
        case_sensitive = True
        env_file = "../../../.env"

settings = Settings()
