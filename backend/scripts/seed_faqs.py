import sys
import os

# Add the parent directory to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.db.session import SessionLocal
from app.models.faq import Faq

def seed_faqs():
    db = SessionLocal()
    
    print("Clearing existing FAQs...")
    db.query(Faq).delete()
    db.commit()

    faqs = [
        {
            "question": "¿Dónde puedo conseguir el manual de mi Estufa?",
            "answer": "Deberá loguearse o registrarse como usuario para poder acceder a los Manuales de Uso y otros archivos de su interés.",
            "order": 1,
            "is_active": True
        },
        {
            "question": "¿Qué significa el service gratuito de por vida?",
            "answer": "Las Estufas luego del período de Garantí­a total, poseen un service gratuito de por vida en el cual solo se cobran los repuestos a cambiar, sin adicionar costo alguno por mano de obra.",
            "order": 2,
            "is_active": True
        },
        {
            "question": "¿Qué diferencia hay entre Secado y Esterilización?",
            "answer": "En cuanto al rango de temperatura es exactamente el mismo. Nosotros los fabricantes las diferenciamos tan solo por el reloj.",
            "order": 3,
            "is_active": True
        },
        {
            "question": "¿Me pueden cotizar una Estufa?",
            "answer": "Dado que nuestra polí­tica de ventas se realiza mediante distribuidores, no hacemos cotizaciones ni ventas directas. Aun así, si tiene alguna consulta técnica la puede hacer a nuestra dirección de mail sanjor@sanjor.com.ar",
            "order": 4,
            "is_active": True
        },
        {
            "question": "¿Las Estufas de Secado Digital BLAST trabajan a la décima de grado?",
            "answer": "Exacto!, en todo el rango ofrecido, la exactitud brindada por el control SR4510 y en estos últimos años con nueva tecnología el SR4520 trabajan en +-0,1ºC ( Ejemplo: Programada a 105,0 la fluctuación en un punto interior es desde 104,9 a 105,1ºC).",
            "order": 5,
            "is_active": True
        },
        {
            "question": "¿Demoran mucho en el Service?",
            "answer": "Las reparaciones y/o modificaciones en Soporte técnico, tienen un promedio de 5hs a partir de aprobado el presupuesto. Habitualmente se notifica entre 48 y 72hs al presupuestar por considerar el día laboral.",
            "order": 6,
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
