# Import all the models, so that Base has them before being
# imported by Alembic
from app.db.base_class import Base  # noqa
# Import all the models, so that Base has them before being
# imported by Alembic
from app.db.base_class import Base  # noqa
from app.models.product import Product  # noqa
from app.models.user import User  # noqa
from app.models.news import News  # noqa
from app.models.history import History  # noqa
from app.models.download import Download  # noqa
from app.models.carousel import CarouselItem  # noqa
from app.models.service_request import ServiceRequest  # noqa
from app.models.warranty_registration import WarrantyRegistration  # noqa
from app.models.newsletter import Newsletter  # noqa
from app.models.faq import Faq  # noqa
