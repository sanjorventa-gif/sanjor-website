import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from sqlalchemy.orm import Session
from app.db.session import SessionLocal
from app.models.product import Product
import json

def inspect_product():
    db = SessionLocal()
    try:
        print("Querying product 1...")
        product = db.query(Product).filter(Product.id == 1).first()
        if not product:
            print("Product 1 not found.")
            return

        print(f"Product found: {product.name}")
        print(f"Features type: {type(product.features)}")
        print(f"Features value: {product.features}")
        print(f"Dimensions type: {type(product.dimensions)}")
        print(f"Dimensions value: {product.dimensions}")
        
        # Try to encode it
        from fastapi.encoders import jsonable_encoder
        print("Attempting jsonable_encoder...")
        encoded = jsonable_encoder(product)
        print("Encoded successfully.")
        print(json.dumps(encoded, indent=2))

    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
    finally:
        db.close()

if __name__ == "__main__":
    inspect_product()
