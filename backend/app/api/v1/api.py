from fastapi import APIRouter

from app.api.v1.endpoints import auth, products, users

api_router = APIRouter()
api_router.include_router(auth.router, tags=["login"])
api_router.include_router(products.router, prefix="/products", tags=["products"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
