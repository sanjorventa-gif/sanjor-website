# SAN JOR Backend API

Backend built with FastAPI and SQLAlchemy.

## Setup & Running

It is recommended to use the virtual environment located at `t:\PROYECTOS\.venv`.

1.  **Install Dependencies**:
    Make sure you are using the virtual environment's python.
    ```powershell
    t:\PROYECTOS\.venv\Scripts\python.exe -m pip install -r requirements.txt
    ```

2.  **Initialize the Database**:
    Run this command from the `backend` directory:
    ```powershell
    t:\PROYECTOS\.venv\Scripts\python.exe -m app.initial_data
    ```
    This will create `sql_app.db` and a default admin user:
    *   Email: `admin@sanjor.com.ar`
    *   Password: `sanjor2024`

3.  **Start the Server**:
    ```powershell
    t:\PROYECTOS\.venv\Scripts\python.exe -m uvicorn app.main:app --reload
    ```
    The API will be available at `http://localhost:8000`.
    Interactive docs at `http://localhost:8000/docs`.

## Project Structure

*   `app/main.py`: Entry point.
*   `app/api`: API endpoints.
*   `app/models`: Database models.
*   `app/schemas`: Pydantic schemas.
*   `app/crud`: Database operations.
*   `app/core`: Configuration and security.
