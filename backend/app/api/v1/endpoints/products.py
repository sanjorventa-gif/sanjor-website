from typing import Any, List, Dict

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, models, schemas
from app.api import deps

router = APIRouter()

@router.get("/", response_model=List[schemas.Product])
def read_products(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve products.
    """
    products = crud.product.get_multi(db, skip=skip, limit=limit)
    return products

@router.post("/", response_model=schemas.Product)
def create_product(
    *,
    db: Session = Depends(deps.get_db),
    product_in: schemas.ProductCreate,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Create new product.
    """
    product = crud.product.create(db=db, obj_in=product_in)
    return product

@router.put("/reorder", response_model=List[schemas.Product])
def reorder_products(
    *,
    db: Session = Depends(deps.get_db),
    ordered_products: List[Dict[str, Any]], # List of {id: str, order: int}
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Reorder products.
    """
    updated_products = []
    for item in ordered_products:
        product = crud.product.get(db=db, id=item["id"])
        if product:
            # We need to update only the order. 
            # crud.product.update expects a schema or dict.
            # We can pass a dict.
            updated_product = crud.product.update(db=db, db_obj=product, obj_in={"order": item["order"]})
            updated_products.append(updated_product)
    return updated_products

@router.put("/{id}", response_model=schemas.Product)
def update_product(
    *,
    db: Session = Depends(deps.get_db),
    id: str,
    product_in: schemas.ProductUpdate,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Update an existing product.
    """
    try:
        product = crud.product.get(db=db, id=id)
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        product = crud.product.update(db=db, db_obj=product, obj_in=product_in)
        return product
    except Exception as e:
        print(f"Update error: {e}")
        raise HTTPException(status_code=500, detail=f"Update failed: {str(e)}")

@router.delete("/{id}", response_model=schemas.Product)
def delete_product(
    *,
    db: Session = Depends(deps.get_db),
    id: str,
    current_user: models.User = Depends(deps.get_current_active_superuser),
) -> Any:
    """
    Delete a product.
    """
    product = crud.product.get(db=db, id=id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    product = crud.product.remove(db=db, id=id)
    return product
