import sys
import os

# Add the parent directory to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.db.session import SessionLocal
from app.models.faq import Faq

def seed_faqs():
    db = SessionLocal()
    
    # Check if FAQs already exist
    if db.query(Faq).first():
        print("FAQs already exist. Skipping seed.")
        return

    faqs = [
        {
            "question": "¿Cómo registro mi garantía?",
            "answer": "Para registrar su garantía, ingrese a la sección \"Servicios\" y seleccione \"Registro de Estufas\". Complete el formulario con los datos de su equipo y factura de compra.",
            "order": 1,
            "is_active": True
        },
        {
            "question": "¿Cómo solicito servicio técnico?",
            "answer": "Puede solicitar asistencia técnica ingresando a \"Servicios\" y seleccionando \"Soporte Técnico\". Allí podrá detallar el inconveniente y nuestro equipo se pondrá en contacto a la brevedad.",
            "order": 2,
            "is_active": True
        },
        {
            "question": "¿Cuál es el período de garantía?",
            "answer": "Nuestras estufas cuentan con una garantía estándar de 12 meses. Puede extender este plazo mediante nuestro programa de \"Extensión de Garantía\".",
            "order": 3,
            "is_active": True
        }
    ]

    for faq_data in faqs:
        faq = Faq(**faq_data)
        db.add(faq)
    
    db.commit()
    print("FAQs seeded successfully!")
    db.close()

if __name__ == "__main__":
    seed_faqs()
