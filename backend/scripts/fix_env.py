import os

content = """VITE_API_URL=http://localhost:8000/api/v1
BACKEND_CORS_ORIGINS=["http://localhost:5173","http://localhost:3000"]
SQLALCHEMY_DATABASE_URI=sqlite:///./sql_app.db
SECRET_KEY=YOUR_SECRET_KEY_HERE_CHANGE_IN_PRODUCTION
ACCESS_TOKEN_EXPIRE_MINUTES=11520
RECAPTCHA_SECRET_KEY=6LchMx4sAAAAAOx1cvlmCgncPsbU0f23EtxN86hv
PROJECT_NAME=SAN JOR API
API_V1_STR=/api/v1
VITE_RECAPTCHA_SITE_KEY=6LchMx4sAAAAAMGyvShBVEd4KioI476IBu9ylPLO
"""

# Path to .env (2 levels up from backend/scripts)
env_path = os.path.join(os.path.dirname(__file__), '../../.env')

with open(env_path, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Successfully updated .env at {os.path.abspath(env_path)}")
