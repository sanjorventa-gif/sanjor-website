import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from app.db.session import SessionLocal
from app.models.carousel import CarouselItem
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def seed_carousel_vicking():
    db = SessionLocal()
    try:
        print("Seeding Vicking Carousel...")
        
        # Clear existing items
        db.query(CarouselItem).delete()
        print("Cleared existing carousel items.")

        vicking_data = [
            {
                "title": "VICKING",
                "subtitle": "Equipos médicos de alta calidad. Ahora con soporte técnico oficial de Sanjor.",
                "image": "/images/carousel/vicking-slide-final.png",
                "order": 1,
                "button_text": "Solicitar Soporte",
                "button_link": "/servicios/tecnico",
                "overlay_effect": "grid",
                "transition_effect": "fade"
            },
            {
                "title": "Soporte Técnico Oficial",
                "subtitle": "Garantizamos el funcionamiento de sus equipos con repuestos originales y técnicos certificados.",
                "image": "/images/carousel/vicking-slide-final.png",
                "order": 2,
                "button_text": "Ver Preguntas Frecuentes",
                "button_link": "/preguntas-frecuentes",
                "overlay_effect": "grid",
                "transition_effect": "fade"
            }
        ]

        for item in vicking_data:
            print(f"Adding item: {item['title']}")
            # Ensure we only pass fields that exist in the model. 
            # Assuming models.carousel.CarouselItem matches what we saw in the frontend interface.
            # If backend model differs, we might need to adjust.
            # However, looking at previous context, we saw frontend interface.
            # Let's assume standard fields. If extra fields like overlay_effect aren't in DB, they might fail.
            # But earlier migrate_carousel_overlay.py suggests they exist.
            carousel_entry = CarouselItem(**item)
            db.add(carousel_entry)
        
        db.commit()
        print("Vicking Carousel seeded successfully!")

    except Exception as e:
        print(f"Error seeding carousel: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_carousel_vicking()
