from typing import List
from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate

class CRUDProduct(CRUDBase[Product, ProductCreate, ProductUpdate]):
    def get_multi(self, db: Session, *, skip: int = 0, limit: int = 100) -> List[Product]:
        return db.query(self.model).order_by(self.model.order.asc()).offset(skip).limit(limit).all()

product = CRUDProduct(Product)
