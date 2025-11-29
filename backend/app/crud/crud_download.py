from typing import List, Optional
from sqlalchemy.orm import Session
from app.crud.base import CRUDBase
from app.models.download import Download
from app.schemas.download import DownloadCreate, DownloadUpdate

class CRUDDownload(CRUDBase[Download, DownloadCreate, DownloadUpdate]):
    def get_multi_by_role(
        self, db: Session, *, role: str, skip: int = 0, limit: int = 100
    ) -> List[Download]:
        # If admin, return all
        if role == "admin":
            return self.get_multi(db, skip=skip, limit=limit)
        
        # Otherwise, filter by allowed_roles containing the user's role
        # Note: JSON containment queries can be DB-specific. 
        # For simplicity in SQLite/Postgres generic, we might fetch and filter in python 
        # OR use specific operators. 
        # Given the likely small number of downloads, filtering in Python is safe and portable for now.
        
        all_downloads = self.get_multi(db, skip=0, limit=1000)
        filtered = []
        for d in all_downloads:
            # If allowed_roles is empty, maybe it's public? Or strictly restricted?
            # Let's assume empty = public or we explicitly add "public" role?
            # The requirement says "select for which roles".
            if not d.allowed_roles or role in d.allowed_roles:
                filtered.append(d)
        
        return filtered[skip : skip + limit]

download = CRUDDownload(Download)
