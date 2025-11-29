from typing import List
from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.models.history import History
from app.schemas.history import HistoryCreate, HistoryUpdate

class CRUDHistory(CRUDBase[History, HistoryCreate, HistoryUpdate]):
    def get_multi(self, db: Session, *, skip: int = 0, limit: int = 100) -> List[History]:
        return db.query(self.model).order_by(self.model.year.desc(), self.model.order).offset(skip).limit(limit).all()

history = CRUDHistory(History)
