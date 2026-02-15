try:
    import fastapi
    import uvicorn
    import sqlalchemy
    import pymysql
    import aiomysql
    import pydantic
    import pydantic_settings
    import email_validator
    print("All imports successful")
except ImportError as e:
    print(f"Import failed: {e}")
