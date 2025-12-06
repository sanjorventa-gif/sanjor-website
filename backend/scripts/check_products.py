import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from app.db.session import SessionLocal
from app.models.product import Product
from app.schemas.product import Product as ProductSchema
from pydantic import ValidationError

db = SessionLocal()
products = db.query(Product).all()

print(f"Found {len(products)} products in DB.")

for p in products:
    try:
        # Simulate Pydantic validation
        product_data = ProductSchema.from_orm(p)
        # print(f"Valid: {product_data.name}")
    except ValidationError as e:
        print(f"Validation Error for product ID {p.id}: {e}")
    except Exception as e:
        print(f"Error processing product ID {p.id}: {e}")

db.close()
