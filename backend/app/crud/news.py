from app.crud.base import CRUDBase
from app.models.news import News
from app.schemas.news import NewsCreate, NewsUpdate

class CRUDNews(CRUDBase[News, NewsCreate, NewsUpdate]):
    pass

news = CRUDNews(News)
