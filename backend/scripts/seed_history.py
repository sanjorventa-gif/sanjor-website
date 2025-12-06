import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from app.db.session import SessionLocal
from app.models.history import History
from app.crud.crud_history import history as crud_history
from app.schemas.history import HistoryCreate

db = SessionLocal()

# Clear existing history (optional, but good for idempotency if we want to reset)
# db.query(History).delete()
# db.commit()

# Check if history exists
if db.query(History).count() > 0:
    print("History already exists. Skipping seed.")
    db.close()
    exit()

history_data = [
    {
        "year": 2019,
        "title": "SAN JOR Internacional",
        "description": "SAN JOR participa en forma directa o indirecta en 7 ferias internacionales en 4 países, en todas ellas presentando el Sistema BLAST y las estufas EcoLogic.",
        "order": 0
    },
    {
        "year": 2018,
        "title": "40 Aniversario SAN JOR",
        "description": "Es el 40 aniversario de SAN JOR de su planta exclusiva para la fabricación de estufas de esterilización y cultivo, que se celebra en el evento de mayor repercusión en el sector salud en Puerto Madero – Buenos Aires.",
        "order": 1
    },
    {
        "year": 2012,
        "title": "Sistema BLAST",
        "description": "El diseño del Sistema BLAST es reconocido y galardonado por su éxito e inserción en el mercado, en la premiación de JeFeba por la Provincia de Buenos Aires en Argentina.",
        "order": 2
    },
    {
        "year": 2010,
        "title": "EcoLogic Control Digital",
        "description": "En base al diseño de la tecnología “Sistema BLAST” se desarrolla el control digital automático para realizar los ciclos de esterilización de forma fácil para el operador, lanzando al mercado la línea EcoLogic.",
        "order": 3
    },
    {
        "year": 2009,
        "title": "Sistema BLAST",
        "description": "Diseño propio de la tecnología “Sistema BLAST” para la máxima precisión en el control de temperatura para las Estufas utilizadas en laboratorio.",
        "order": 4
    },
    {
        "year": 2004,
        "title": "Premios a la exportación Argentina",
        "description": "SAN JOR es ganador del Premio a la Exportación Argentina como fabricante de Equipos Médicos, Hospitalarios y de Laboratorio otorgado por FedEx.",
        "order": 5
    },
    {
        "year": 1994,
        "title": "Ampliación de la empresa",
        "description": "Aumenta la superficie de la planta de producción, oficinas y depósito en un 30%, mejorando la organización interna y los tiempos de producción.",
        "order": 6
    },
    {
        "year": 1993,
        "title": "Grupo COEX de exportación",
        "description": "SAN JOR es integrante y cofundador del Grupo COEX de Exportación, grupo de empresas fabricantes de equipos para medicina y bioquímica.",
        "order": 7
    },
    {
        "year": 1984,
        "title": "Ampliación de la planta",
        "description": "La ampliación de la planta de fabricación se triplica en superficie con respecto al año 1978, incorporando equipos de trabajo de alta tecnología.",
        "order": 8
    },
    {
        "year": 1978,
        "title": "Nueva Planta",
        "description": "La fabrica se muda a una nueva planta de fabricación con el nombre de “SAN JOR”, liderando el mercado en el rubro de fabricación de Estufas.",
        "order": 9
    },
    {
        "year": 1950,
        "title": "Inicio de actividades",
        "description": "Inicia la fabricación de Estufas, Cajas y tambores de acero inoxidable con el nombre de “Metalúrgica SAN JOR” para el área hospitalaria.",
        "order": 10
    }
]

for item in history_data:
    history_in = HistoryCreate(**item)
    crud_history.create(db=db, obj_in=history_in)
    print(f"Created history entry: {item['year']} - {item['title']}")

db.close()
