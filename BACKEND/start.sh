#!/bin/bash
set -e

# Make BACKEND the import root so "import app" works
export PYTHONPATH="$(pwd)"

echo "Checking Alembic heads..."
python -m alembic heads

echo "Running migrations..."
alembic upgrade head

echo "Seeding database..."
python scripts/seed.py

echo "Starting Gunicorn..."
PORT="${PORT:-8000}"
exec gunicorn -w 4 -k uvicorn.workers.UvicornWorker app.main:app --bind "0.0.0.0:$PORT"
