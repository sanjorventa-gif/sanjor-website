from fastapi import APIRouter

from app.api.v1.endpoints import auth, users, products, news, history, downloads, carousel, services, newsletter, upload, faqs, contact

api_router = APIRouter()
api_router.include_router(auth.router, tags=["login"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(products.router, prefix="/products", tags=["products"])
api_router.include_router(news.router, prefix="/news", tags=["news"])
api_router.include_router(history.router, prefix="/history", tags=["history"])
api_router.include_router(downloads.router, prefix="/downloads", tags=["downloads"])
api_router.include_router(carousel.router, prefix="/carousel", tags=["carousel"])
api_router.include_router(services.router, prefix="/services", tags=["services"])
api_router.include_router(newsletter.router, prefix="/newsletter", tags=["newsletter"])
api_router.include_router(upload.router, prefix="/upload", tags=["upload"])
api_router.include_router(faqs.router, prefix="/faqs", tags=["faqs"])
api_router.include_router(contact.router, prefix="/contact", tags=["contact"])
