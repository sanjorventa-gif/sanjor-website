import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from app.db.session import SessionLocal
from app.models.faq import Faq

def seed_vicking_faqs():
    db = SessionLocal()
    
    print("Clearing existing FAQs...")
    db.query(Faq).delete()
    db.commit()

    faqs = [
        {
            "question": "¿Dónde puedo conseguir el manual de mi Estufa?",
            "answer": "Podrá solicitarlo por mail a la dirección soporte@vicking.com.ar ya sean los manuales de Uso y otros archivos de su interés.",
            "order": 1,
            "is_active": True
        },
        {
            "question": "¿Dónde puedo reparar mi equipo Vicking?",
            "answer": "Podrá completar el formulario de soporte o escribir a la dirección soporte@vicking.com.ar",
            "order": 2,
            "is_active": True
        },
        {
            "question": "¿Me pueden cotizar un Equipo nuevo?",
            "answer": "Los equipos se han discontinuado en su fabricación pero quedan en stock equipos nuevos que tendrán su garantía correspondiente y servicio técnico de por vida. Puede enviar un mail a la dirección soporte@vicking.com.ar",
            "order": 3,
            "is_active": True
        }
    ]

    for faq_data in faqs:
        faq = Faq(**faq_data)
        db.add(faq)
    
    db.commit()
    print("Vicking FAQs seeded successfully!")
    db.close()

if __name__ == "__main__":
    seed_vicking_faqs()
