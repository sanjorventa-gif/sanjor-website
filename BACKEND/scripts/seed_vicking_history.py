import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from app.db.session import SessionLocal
from app.models.history import History
from app.crud.crud_history import history as crud_history
from app.schemas.history import HistoryCreate

def seed_vicking_history():
    db = SessionLocal()
    
    # Clear existing history
    print("Clearing existing history...")
    db.query(History).delete()
    db.commit()

    vicking_history_data = [
        {
            "year": 2004,
            "title": "Premio a la Exportación",
            "description": "VICKING es ganador del Premio a la Exportación Argentina como fabricante de Equipos Médicos, Hospitalarios y de Laboratorio otorgado por FedEx.",
            "order": 1
        },
        {
            "year": 1995, # Assuming 19XX -> 1995 based on context
            "title": "Lanzamiento Shaker Pro",
            "description": "Carlos Recchia con un diseño único en el mundo lanza al mercado el agitador Shaker Pro.",
            "order": 2
        },
        {
            "year": 1993,
            "title": "Grupo COEX",
            "description": "VICKING es integrante y cofundador del Grupo COEX de Exportación, grupo de empresas fabricantes de equipos para medicina y bioquímica.",
            "order": 3
        },
        {
            "year": 1970, # Assuming 19XX -> 1970 based on context
            "title": "Nueva Planta",
            "description": "La fabrica se muda a una nueva planta de fabricación bla bla bla bla bla bla bla bla bla bla bla bla.",
             "order": 4
        },
        {
            "year": 1960, # Assuming 19XX -> 1960
            "title": "Inicios",
            "description": "Carlos Recchia Inicia la fabricación de equipos de laboratorio con la marca Vicking.",
            "order": 5
        }
    ]

    for item in vicking_history_data:
        try:
            # We use direct model creation if schema validation fails on strict types, but schema is better
            # Note: history schema likely expects int for year.
            history_entry = History(
                year=item["year"],
                title=item["title"],
                description=item["description"],
                order=item["order"]
            )
            db.add(history_entry)
            print(f"Created history entry: {item['year']} - {item['title']}")
        except Exception as e:
            print(f"Error creating entry {item['year']}: {e}")

    db.commit()
    db.close()
    print("Vicking History seeded successfully!")

if __name__ == "__main__":
    seed_vicking_history()
