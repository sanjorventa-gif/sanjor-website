from app.crud.base import CRUDBase
from app.models.newsletter import Newsletter
from app.schemas.newsletter import NewsletterCreate

class CRUDNewsletter(CRUDBase[Newsletter, NewsletterCreate, NewsletterCreate]):
    pass

newsletter = CRUDNewsletter(Newsletter)
