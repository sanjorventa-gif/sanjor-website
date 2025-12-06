import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from app.db.session import SessionLocal
from app.models.carousel import CarouselItem
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def seed_carousel():
    db = SessionLocal()
    try:
        print("Seeding Carousel...")
        
        # Check if items already exist
        count = db.query(CarouselItem).count()
        if count > 0:
            print(f"Carousel already has {count} items. Skipping.")
            return

        carousel_data = [
            {
                "title": "Innovación en Estufas",
                "subtitle": "Tecnología de punta para su laboratorio.",
                "image": "https://placehold.co/1200x400?text=Innovacion",
                "order": 1
            },
            {
                "title": "Calidad Garantizada",
                "subtitle": "Más de 50 años de experiencia nos avalan.",
                "image": "https://placehold.co/1200x400?text=Calidad",
                "order": 2
            }
        ]

        for item in carousel_data:
            print(f"Adding item: {item['title']}")
            carousel_entry = CarouselItem(**item)
            db.add(carousel_entry)
        
        db.commit()
        print("Carousel seeded successfully!")

    except Exception as e:
        print(f"Error seeding carousel: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_carousel()
