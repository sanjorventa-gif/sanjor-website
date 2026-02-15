import os

# Default values for non-sensitive data
DEFAULT_PROJECT_NAME = "WebInvita"
DEFAULT_DATABASE_URL = "sqlite+aiosqlite:///webinvita.db"
DEFAULT_SECRET_KEY = "CHANGE_THIS_IN_PRODUCTION_SECRET_KEY_12345"
DEFAULT_CORS_ORIGINS = '["http://localhost:5173", "http://localhost:3000", "http://localhost:8000"]'

# Get values from environment variables
project_name = os.getenv("PROJECT_NAME", DEFAULT_PROJECT_NAME)
database_url = os.getenv("DATABASE_URL", DEFAULT_DATABASE_URL)
secret_key = os.getenv("SECRET_KEY", DEFAULT_SECRET_KEY)
cors_origins = os.getenv("BACKEND_CORS_ORIGINS", DEFAULT_CORS_ORIGINS)

# Sensitive data - must be provided via environment variables in production
google_client_id = os.getenv("GOOGLE_OAUTH_CLIENT_ID", "")
google_client_secret = os.getenv("GOOGLE_OAUTH_CLIENT_SECRET", "")
google_refresh_token = os.getenv("GOOGLE_OAUTH_REFRESH_TOKEN", "")
google_folder_id = os.getenv("GOOGLE_PRO_CLIENTS_FOLDER_ID", "")
google_rsvp_form_id = os.getenv("GOOGLE_TEMPLATE_RSVP_FORM_ID", "")
google_songs_form_id = os.getenv("GOOGLE_TEMPLATE_SONGS_FORM_ID", "")

content = f"""PROJECT_NAME="{project_name}"
DATABASE_URL="{database_url}"
SECRET_KEY="{secret_key}"
BACKEND_CORS_ORIGINS={cors_origins}
GOOGLE_OAUTH_CLIENT_ID={google_client_id}
GOOGLE_OAUTH_CLIENT_SECRET={google_client_secret}
GOOGLE_OAUTH_REFRESH_TOKEN={google_refresh_token}
GOOGLE_PRO_CLIENTS_FOLDER_ID={google_folder_id}
GOOGLE_TEMPLATE_RSVP_FORM_ID={google_rsvp_form_id}
GOOGLE_TEMPLATE_SONGS_FORM_ID={google_songs_form_id}
"""

with open(".env", "w", encoding="utf-8") as f:
    f.write(content)
print("Fixed .env from environment variables")
