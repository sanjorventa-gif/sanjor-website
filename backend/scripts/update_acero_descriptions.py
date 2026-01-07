import sys
import os
import logging

# Add backend to python path
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from app.db.session import SessionLocal
from app.models.product import Product

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def update_acero_descriptions():
    db = SessionLocal()
    try:
        new_description = "Cajas fabricadas en acero inoxidable grado 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma. Especiales para ortopedia."
        
        products = db.query(Product).filter(Product.category == 'acero').all()
        
        if not products:
            logger.info("No 'acero' products found.")
            return

        logger.info(f"Updating description for {len(products)} products.")
        
        for product in products:
            product.description = new_description
            db.add(product)
        
        db.commit()
        logger.info("Descriptions updated successfully!")
        
    except Exception as e:
        logger.error(f"Error updating descriptions: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    update_acero_descriptions()
