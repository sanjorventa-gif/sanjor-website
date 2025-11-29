from app.crud.base import CRUDBase
from app.models.carousel import CarouselItem
from app.schemas.carousel import CarouselItemCreate, CarouselItemUpdate

class CRUDCarousel(CRUDBase[CarouselItem, CarouselItemCreate, CarouselItemUpdate]):
    pass

carousel = CRUDCarousel(CarouselItem)
