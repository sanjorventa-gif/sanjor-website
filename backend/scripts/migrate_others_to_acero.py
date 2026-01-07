import sys
import os
import logging

# Add backend to python path
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from app.db.session import SessionLocal
from app.models.product import Product

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def migrate_others():
    db = SessionLocal()
    try:
        # Find products to update
        # We want to move 'otro' and 'cajas' (if any) to 'acero'
        products_to_update = db.query(Product).filter(
            Product.category.in_(['otro', 'cajas'])
        ).all()
        
        if not products_to_update:
            logger.info("No products found in 'otro' or 'cajas' categories.")
            return

        logger.info(f"Found {len(products_to_update)} products to migrate to 'acero'.")
        
        for product in products_to_update:
            old_cat = product.category
            product.category = 'acero'
            logger.info(f"Updating '{product.name}' ({product.id}): {old_cat} -> acero")
            db.add(product)
        
        db.commit()
        logger.info("Migration completed successfully!")
        
    except Exception as e:
        logger.error(f"Error migrating products: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    migrate_others()
