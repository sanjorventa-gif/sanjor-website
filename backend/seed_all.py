import logging
import sys
import os

# Ensure we can import from app
sys.path.append(os.getcwd())

from app.db.session import SessionLocal, engine
from app.models.product import Product
from app.models.user import User
from app.db.base_class import Base
# Import all models to ensure they are registered with Base.metadata
from app.db import base  # noqa
from app.core.security import get_password_hash
from app.db.seed_products import seed_products as seed_products_logic

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def seed_all():
    db = SessionLocal()
    try:
        # Re-create tables to ensure schema matches
        logger.info("Re-creating tables...")
        Base.metadata.drop_all(bind=engine)
        Base.metadata.create_all(bind=engine)

        # --- SEED ADMIN USER ---
        logger.info("Seeding Admin User...")
        admin_email = "admin@sanjor.com.ar"
        admin_password = "sanjor2024"
        
        user = User(
            email=admin_email,
            hashed_password=get_password_hash(admin_password),
            is_superuser=True,
            is_active=True,
            role="admin"
        )
        db.add(user)
        db.commit()
        logger.info(f"Admin user created: {admin_email} / {admin_password}")

        # --- SEED PRODUCTS ---
        # We can reuse the logic from seed_products.py but we need to adapt it 
        # because seed_products.py also does drop_all/create_all.
        # So we will just copy the product data list here to avoid double dropping.
        
        logger.info("Seeding Products...")
        # Import the data list directly if possible, or just copy it. 
        # Since seed_products.py has the list inside the function, I will copy it here for safety and completeness.
        # This ensures this script is standalone.
        
        products_data = [
            # --- CAJAS DE ACERO INOXIDABLE ---
            {
                "id": "sc-17-7-3",
                "name": "Caja de Acero Inoxidable SC-17-7-3",
                "category": "cajas",
                "description": "Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma. Especial para ortopedia.",
                "image": "https://placehold.co/400x300?text=Caja+Acero+Inoxidable",
                "features": ["Acero Inoxidable 304º 18/8", "Soldadura por plasma", "Alta calidad para ortopedia"],
                "dimensions": {"length": 17, "width": 7, "height": 3, "unit": "cm"},
                "order": 100,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "sc-32-12-7",
                "name": "Caja de Acero Inoxidable SC-32-12-7",
                "category": "cajas",
                "description": "Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.",
                "image": "https://placehold.co/400x300?text=Caja+Acero+Inoxidable",
                "features": ["Acero Inoxidable 304º 18/8", "Soldadura por plasma"],
                "dimensions": {"length": 32, "width": 12, "height": 7, "unit": "cm"},
                "order": 101,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
             {
                "id": "sc-32-15-6",
                "name": "Caja de Acero Inoxidable SC-32-15-6",
                "category": "cajas",
                "description": "Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.",
                "image": "https://placehold.co/400x300?text=Caja+Acero+Inoxidable",
                "features": ["Acero Inoxidable 304º 18/8", "Soldadura por plasma"],
                "dimensions": {"length": 32, "width": 15, "height": 6, "unit": "cm"},
                "order": 102,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "sc-34-16-7",
                "name": "Caja de Acero Inoxidable SC-34-16-7",
                "category": "cajas",
                "description": "Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.",
                "image": "https://placehold.co/400x300?text=Caja+Acero+Inoxidable",
                "features": ["Acero Inoxidable 304º 18/8", "Soldadura por plasma"],
                "dimensions": {"length": 34, "width": 16, "height": 7, "unit": "cm"},
                "order": 103,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "sc-35-17-8",
                "name": "Caja de Acero Inoxidable SC-35-17-8",
                "category": "cajas",
                "description": "Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.",
                "image": "https://placehold.co/400x300?text=Caja+Acero+Inoxidable",
                "features": ["Acero Inoxidable 304º 18/8", "Soldadura por plasma"],
                "dimensions": {"length": 35, "width": 17, "height": 8, "unit": "cm"},
                "order": 104,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "sc-40-20-8",
                "name": "Caja de Acero Inoxidable SC-40-20-8",
                "category": "cajas",
                "description": "Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.",
                "image": "https://placehold.co/400x300?text=Caja+Acero+Inoxidable",
                "features": ["Acero Inoxidable 304º 18/8", "Soldadura por plasma"],
                "dimensions": {"length": 40, "width": 20, "height": 8, "unit": "cm"},
                "order": 105,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "sc-40-20-10",
                "name": "Caja de Acero Inoxidable SC-40-20-10",
                "category": "cajas",
                "description": "Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.",
                "image": "https://placehold.co/400x300?text=Caja+Acero+Inoxidable",
                "features": ["Acero Inoxidable 304º 18/8", "Soldadura por plasma"],
                "dimensions": {"length": 40, "width": 20, "height": 10, "unit": "cm"},
                "order": 106,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "sc-40-30-10",
                "name": "Caja de Acero Inoxidable SC-40-30-10",
                "category": "cajas",
                "description": "Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.",
                "image": "https://placehold.co/400x300?text=Caja+Acero+Inoxidable",
                "features": ["Acero Inoxidable 304º 18/8", "Soldadura por plasma"],
                "dimensions": {"length": 40, "width": 30, "height": 10, "unit": "cm"},
                "order": 107,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "sc-45-20-10",
                "name": "Caja de Acero Inoxidable SC-45-20-10",
                "category": "cajas",
                "description": "Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.",
                "image": "https://placehold.co/400x300?text=Caja+Acero+Inoxidable",
                "features": ["Acero Inoxidable 304º 18/8", "Soldadura por plasma"],
                "dimensions": {"length": 45, "width": 20, "height": 10, "unit": "cm"},
                "order": 108,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "sc-45-25-10",
                "name": "Caja de Acero Inoxidable SC-45-25-10",
                "category": "cajas",
                "description": "Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.",
                "image": "https://placehold.co/400x300?text=Caja+Acero+Inoxidable",
                "features": ["Acero Inoxidable 304º 18/8", "Soldadura por plasma"],
                "dimensions": {"length": 45, "width": 25, "height": 10, "unit": "cm"},
                "order": 109,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "sc-45-30-10",
                "name": "Caja de Acero Inoxidable SC-45-30-10",
                "category": "cajas",
                "description": "Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.",
                "image": "https://placehold.co/400x300?text=Caja+Acero+Inoxidable",
                "features": ["Acero Inoxidable 304º 18/8", "Soldadura por plasma"],
                "dimensions": {"length": 45, "width": 30, "height": 10, "unit": "cm"},
                "order": 110,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "sc-50-20-10",
                "name": "Caja de Acero Inoxidable SC-50-20-10",
                "category": "cajas",
                "description": "Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.",
                "image": "https://placehold.co/400x300?text=Caja+Acero+Inoxidable",
                "features": ["Acero Inoxidable 304º 18/8", "Soldadura por plasma"],
                "dimensions": {"length": 50, "width": 20, "height": 10, "unit": "cm"},
                "order": 111,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },

            # --- ESTUFAS DE CULTIVO ---
            {
                "id": "sl17c",
                "name": "Estufa de Cultivo SL17C",
                "category": "cultivo",
                "description": "Estufa de Cultivo (Pequeña). Termorregulador electrónico con regulación Macro y Micro. Indicador lumínico de funcionamiento. Interruptor de corte de funcionamiento. 1 Puerta única de vidrio (visibilidad 100%). Exactitud: +- 0,1ºC. 2 Estantes tipo Rejilla (3 posiciones). Extensión de garantía gratuita a 2 años.",
                "image": "https://placehold.co/400x300?text=Estufa+Cultivo",
                "features": ["Termorregulador electrónico", "Regulación Macro y Micro", "Puerta de vidrio", "Exactitud +- 0,1ºC"],
                "dimensions": {"length": 22, "width": 17, "height": 17, "unit": "cm"},
                "temperature": {"min": 20, "max": 70, "unit": "°C"},
                "order": 10,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "sl17cdb",
                "name": "Estufa de Cultivo SL17CDB",
                "category": "cultivo",
                "description": "Estufa de Cultivo (Pequeña). Control Digital de Temperatura Autotuning PID Sistema BLAST. Doble visor de temperatura Interna y Programada. Indicadores lumínicos de Resistencia y de Alarma. 1 Puerta única de vidrio (visibilidad 100%). Exactitud: +- 0,1ºC. 2 Estantes tipo Rejilla (3 posiciones). Extensión de garantía gratuita a 2 años.",
                "image": "https://placehold.co/400x300?text=Estufa+Cultivo",
                "features": ["Control Digital PID", "Sistema BLAST", "Doble visor", "Puerta de vidrio"],
                "dimensions": {"length": 22, "width": 17, "height": 17, "unit": "cm"},
                "temperature": {"min": 0, "max": 80, "unit": "°C"},
                "order": 11,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "sl20c",
                "name": "Estufa de Cultivo SL20C",
                "category": "cultivo",
                "description": "Estufa de Cultivo (Pequeña). Termorregulador electrónico con regulación Macro y Micro. Indicador lumínico de funcionamiento. Interruptor de corte de funcionamiento. 1 Puerta interna de vidrio (visibilidad 100%). Exactitud: +- 0,1ºC. 2 Estantes tipo Rejilla (3 posiciones). Extensión de garantía gratuita a 2 años.",
                "image": "https://placehold.co/400x300?text=Estufa+Cultivo",
                "features": ["Termorregulador electrónico", "Puerta interna de vidrio", "Exactitud +- 0,1ºC"],
                "dimensions": {"length": 30, "width": 20, "height": 20, "unit": "cm"},
                "temperature": {"min": 20, "max": 70, "unit": "°C"},
                "order": 12,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "sl20cdb",
                "name": "Estufa de Cultivo SL20CDB",
                "category": "cultivo",
                "description": "Estufa de Cultivo (Pequeña). Control Digital de Temperatura Autotuning PID Sistema BLAST. Doble visor de temperatura Interna y Programada. Indicadores lumínicos de Resistencia y de Alarma. 1 Puerta interna de vidrio (visibilidad 100%). Exactitud: +- 0,1ºC. 2 Estantes tipo Rejilla (3 posiciones). Extensión de garantía gratuita a 2 años.",
                "image": "https://placehold.co/400x300?text=Estufa+Cultivo",
                "features": ["Control Digital PID", "Sistema BLAST", "Puerta interna de vidrio"],
                "dimensions": {"length": 30, "width": 20, "height": 20, "unit": "cm"},
                "temperature": {"min": 0, "max": 80, "unit": "°C"},
                "order": 13,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "sl30c",
                "name": "Estufa de Cultivo SL30C",
                "category": "cultivo",
                "description": "Estufa de Cultivo (Mediana). Termorregulador electrónico con regulación Macro y Micro. Indicador lumínico de funcionamiento. Interruptor de corte de funcionamiento. 1 Puerta interna de vidrio (visibilidad 100%). Exactitud: +- 0,1ºC. 2 Estantes tipo Rejilla (5 posiciones). Extensión de garantía gratuita a 2 años.",
                "image": "https://placehold.co/400x300?text=Estufa+Cultivo",
                "features": ["Termorregulador electrónico", "Puerta interna de vidrio", "Tamaño mediano"],
                "dimensions": {"length": 30, "width": 40, "height": 30, "unit": "cm"},
                "temperature": {"min": 20, "max": 70, "unit": "°C"},
                "order": 14,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "sl30cdb",
                "name": "Estufa de Cultivo SL30CDB",
                "category": "cultivo",
                "description": "Estufa de Cultivo (Mediana). Control Digital de Temperatura Autotuning PID Sistema BLAST. Doble visor de temperatura Interna y Programada. Indicadores lumínicos de Resistencia y de Alarma. 1 Puerta interna de vidrio (visibilidad 100%). Exactitud: +- 0,1ºC. 2 Estantes tipo Rejilla (5 posiciones). Extensión de garantía gratuita a 2 años.",
                "image": "https://placehold.co/400x300?text=Estufa+Cultivo",
                "features": ["Control Digital PID", "Sistema BLAST", "Puerta interna de vidrio"],
                "dimensions": {"length": 30, "width": 40, "height": 30, "unit": "cm"},
                "temperature": {"min": 0, "max": 80, "unit": "°C"},
                "order": 15,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "sl60c",
                "name": "Estufa de Cultivo SL60C",
                "category": "cultivo",
                "description": "Estufa de Cultivo (Grande). Termorregulador electrónico con regulación Macro y Micro. Indicador lumínico de funcionamiento. Interruptor de corte de funcionamiento. 2 Puertas internas de vidrio (visibilidad 100%). Exactitud: +- 0,1ºC. 2 Estantes tipo Rejilla (5 posiciones). Extensión de garantía gratuita a 2 años.",
                "image": "https://placehold.co/400x300?text=Estufa+Cultivo",
                "features": ["Termorregulador electrónico", "2 Puertas internas de vidrio", "Gran capacidad"],
                "dimensions": {"length": 60, "width": 40, "height": 40, "unit": "cm"},
                "temperature": {"min": 20, "max": 70, "unit": "°C"},
                "order": 16,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "sl60cdb",
                "name": "Estufa de Cultivo SL60CDB",
                "category": "cultivo",
                "description": "Estufa de Cultivo (Grande). Control Digital de Temperatura Autotuning PID Sistema BLAST. Doble visor de temperatura Interna y Programada. Indicadores lumínicos de Resistencia y de Alarma. 2 Puertas internas de vidrio (visibilidad 100%). Exactitud: +- 0,1ºC. 2 Estantes tipo Rejilla (5 posiciones). Extensión de garantía gratuita a 2 años.",
                "image": "https://placehold.co/400x300?text=Estufa+Cultivo",
                "features": ["Control Digital PID", "2 Puertas internas de vidrio", "Gran capacidad"],
                "dimensions": {"length": 60, "width": 40, "height": 40, "unit": "cm"},
                "temperature": {"min": 0, "max": 80, "unit": "°C"},
                "order": 17,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "sl70c",
                "name": "Estufa de Cultivo SL70C",
                "category": "cultivo",
                "description": "Estufa de Cultivo (Grande). Termorregulador electrónico con regulación Macro y Micro. Indicador lumínico de funcionamiento. Interruptor de corte de funcionamiento. 2 Puertas internas de vidrio (visibilidad 100%). Exactitud: +- 0,1ºC. 2 Estantes tipo Rejilla (6 posiciones). Extensión de garantía gratuita a 2 años.",
                "image": "https://placehold.co/400x300?text=Estufa+Cultivo",
                "features": ["Termorregulador electrónico", "2 Puertas internas de vidrio", "Gran capacidad"],
                "dimensions": {"length": 70, "width": 50, "height": 50, "unit": "cm"},
                "temperature": {"min": 20, "max": 70, "unit": "°C"},
                "order": 18,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "sl70cdb",
                "name": "Estufa de Cultivo SL70CDB",
                "category": "cultivo",
                "description": "Estufa de Cultivo (Grande). Control Digital de Temperatura Autotuning PID Sistema BLAST. Doble visor de temperatura Interna y Programada. Indicadores lumínicos de Resistencia y de Alarma. 2 Puertas internas de vidrio (visibilidad 100%). Exactitud: +- 0,1ºC. 2 Estantes tipo Rejilla (6 posiciones). Extensión de garantía gratuita a 2 años.",
                "image": "https://placehold.co/400x300?text=Estufa+Cultivo",
                "features": ["Control Digital PID", "2 Puertas internas de vidrio", "Gran capacidad"],
                "dimensions": {"length": 70, "width": 50, "height": 50, "unit": "cm"},
                "temperature": {"min": 0, "max": 80, "unit": "°C"},
                "order": 19,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },

            # --- ESTUFAS DE ESTERILIZACIÓN ---
            {
                "id": "se33t",
                "name": "Estufa de Esterilización SE33T",
                "category": "esterilizacion",
                "description": "Estufa de Esterilización (Pequeña). Termorregulador hidráulico a capilar. Indicadores lumínicos de Resistencia y funcionamiento. Interruptor de corte de funcionamiento. Exactitud: +- 1,4% del valor final de temperatura. 1 estante tipo rejilla regulable (3 posiciones). Extensión de garantía gratuita a 2 años.",
                "image": "https://placehold.co/400x300?text=Estufa+Esterilizacion",
                "features": ["Termorregulador hidráulico", "Pequeña", "Esterilización"],
                "dimensions": {"length": 33, "width": 20, "height": 20, "unit": "cm"},
                "temperature": {"min": 50, "max": 200, "unit": "°C"},
                "order": 20,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "se33a",
                "name": "Estufa de Esterilización SE33A",
                "category": "esterilizacion",
                "description": "Estufa de Esterilización (Pequeña). Termorregulador hidráulico a capilar. Indicadores lumínicos de Resistencia y funcionamiento. Reloj de corte de 3 horas con alarma y función llave. Exactitud: +- 1,4% del valor final de temperatura. 2 estantes tipo rejilla regulables (3 posiciones). Extensión de garantía gratuita a 2 años.",
                "image": "https://placehold.co/400x300?text=Estufa+Esterilizacion",
                "features": ["Termorregulador hidráulico", "Reloj de corte", "Esterilización"],
                "dimensions": {"length": 33, "width": 20, "height": 20, "unit": "cm"},
                "temperature": {"min": 50, "max": 200, "unit": "°C"},
                "order": 21,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "se33ad",
                "name": "Estufa de Esterilización SE33AD",
                "category": "esterilizacion",
                "description": "Estufa de Esterilización (Pequeña). Control Digital PID EcoLogic con Autotuning. Doble visor de temperatura Interna y Parámetro programado. Decrece el tiempo a partir de llegar a la temperatura programada. Indicadores lumínicos de Resistencia, Alarma y Autotuning. Alarma sonora por sobretemperatura y finalización de ciclo. Exactitud: al grado centígrado. 1 Estante tipo Rejilla regulable (3 posiciones). Extensión de garantía gratuita a 2 años.",
                "image": "https://placehold.co/400x300?text=Estufa+Esterilizacion",
                "features": ["Control Digital PID", "EcoLogic", "Autotuning", "Alarma sonora"],
                "dimensions": {"length": 33, "width": 20, "height": 20, "unit": "cm"},
                "temperature": {"min": 50, "max": 200, "unit": "°C"},
                "order": 22,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "se45t",
                "name": "Estufa de Esterilización SE45T",
                "category": "esterilizacion",
                "description": "Estufa de Esterilización (Mediana). Termorregulador hidráulico a capilar. Indicadores lumínicos de Resistencia y funcionamiento. Interruptor de corte de funcionamiento. Exactitud: +- 1,4% del valor final de temperatura. 1 estante tipo rejilla regulable (3 posiciones). Extensión de garantía gratuita a 2 años.",
                "image": "https://placehold.co/400x300?text=Estufa+Esterilizacion",
                "features": ["Termorregulador hidráulico", "Mediana", "Esterilización"],
                "dimensions": {"length": 45, "width": 25, "height": 25, "unit": "cm"},
                "temperature": {"min": 50, "max": 200, "unit": "°C"},
                "order": 23,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "se45a",
                "name": "Estufa de Esterilización SE45A",
                "category": "esterilizacion",
                "description": "Estufa de Esterilización (Mediana). Termorregulador hidráulico a capilar. Indicadores lumínicos de Resistencia y funcionamiento. Reloj de corte de 3 horas con alarma y función llave. Exactitud: +- 1,4% del valor final de temperatura. 1 estante tipo rejilla regulable (3 posiciones). Extensión de garantía gratuita a 2 años.",
                "image": "https://placehold.co/400x300?text=Estufa+Esterilizacion",
                "features": ["Termorregulador hidráulico", "Reloj de corte", "Mediana"],
                "dimensions": {"length": 45, "width": 25, "height": 25, "unit": "cm"},
                "temperature": {"min": 50, "max": 200, "unit": "°C"},
                "order": 24,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "se45ad",
                "name": "Estufa de Esterilización SE45AD",
                "category": "esterilizacion",
                "description": "Estufa de Esterilización (Mediana). Control Digital PID EcoLogic con Autotuning. Doble visor de temperatura Interna y Parámetro programado. Decrece el tiempo a partir de llegar a la temperatura programada. Indicadores lumínicos de Resistencia, Alarma y Autotuning. Alarma sonora por sobretemperatura y finalización de ciclo. Exactitud: al grado centígrado. 1 Estante tipo Rejilla regulable (3 posiciones). Extensión de garantía gratuita a 2 años.",
                "image": "https://placehold.co/400x300?text=Estufa+Esterilizacion",
                "features": ["Control Digital PID", "EcoLogic", "Autotuning", "Mediana"],
                "dimensions": {"length": 45, "width": 25, "height": 25, "unit": "cm"},
                "temperature": {"min": 50, "max": 200, "unit": "°C"},
                "order": 25,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "se43t",
                "name": "Estufa de Esterilización SE43T",
                "category": "esterilizacion",
                "description": "Estufa de Esterilización (Mediana). Termorregulador hidráulico a capilar. Indicadores lumínicos de Resistencia y funcionamiento. Interruptor de corte de funcionamiento. Exactitud: +- 1,4% del valor final de temperatura. 2 estantes tipo rejilla regulables (3 posiciones). Extensión de garantía gratuita a 2 años.",
                "image": "https://placehold.co/400x300?text=Estufa+Esterilizacion",
                "features": ["Termorregulador hidráulico", "Mediana", "Esterilización"],
                "dimensions": {"length": 45, "width": 30, "height": 30, "unit": "cm"},
                "temperature": {"min": 50, "max": 200, "unit": "°C"},
                "order": 26,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "se43a",
                "name": "Estufa de Esterilización SE43A",
                "category": "esterilizacion",
                "description": "Estufa de Esterilización (Mediana). Termorregulador hidráulico a capilar. Indicadores lumínicos de Resistencia y funcionamiento. Reloj de corte de 3 horas con alarma y función llave. Exactitud: +- 1,4% del valor final de temperatura. 2 estantes tipo rejilla regulables (3 posiciones). Extensión de garantía gratuita a 2 años.",
                "image": "https://placehold.co/400x300?text=Estufa+Esterilizacion",
                "features": ["Termorregulador hidráulico", "Reloj de corte", "Mediana"],
                "dimensions": {"length": 45, "width": 30, "height": 30, "unit": "cm"},
                "temperature": {"min": 50, "max": 200, "unit": "°C"},
                "order": 27,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "se43ad",
                "name": "Estufa de Esterilización SE43AD",
                "category": "esterilizacion",
                "description": "Estufa de Esterilización (Mediana). Control Digital PID EcoLogic con Autotuning. Doble visor de temperatura Interna y Parámetro programado. Decrece el tiempo a partir de llegar a la temperatura programada. Indicadores lumínicos de Resistencia, Alarma y Autotuning. Alarma sonora por sobretemperatura y finalización de ciclo. Exactitud: al grado centígrado. 2 Estantes tipo Rejilla regulables (3 posiciones). Extensión de garantía gratuita a 2 años.",
                "image": "https://placehold.co/400x300?text=Estufa+Esterilizacion",
                "features": ["Control Digital PID", "EcoLogic", "Autotuning", "Mediana"],
                "dimensions": {"length": 45, "width": 30, "height": 30, "unit": "cm"},
                "temperature": {"min": 50, "max": 200, "unit": "°C"},
                "order": 28,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "se60t",
                "name": "Estufa de Esterilización SE60T",
                "category": "esterilizacion",
                "description": "Estufa de Esterilización (Grande). Termorregulador hidráulico a capilar. Indicadores lumínicos de Resistencia y funcionamiento. Interruptor de corte de funcionamiento. Exactitud: +- 1,4% del valor final de temperatura. 2 estantes tipo rejilla regulables (5 posiciones). Extensión de garantía gratuita a 2 años.",
                "image": "https://placehold.co/400x300?text=Estufa+Esterilizacion",
                "features": ["Termorregulador hidráulico", "Grande", "Esterilización"],
                "dimensions": {"length": 60, "width": 40, "height": 40, "unit": "cm"},
                "temperature": {"min": 50, "max": 200, "unit": "°C"},
                "order": 29,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "se60a",
                "name": "Estufa de Esterilización SE60A",
                "category": "esterilizacion",
                "description": "Estufa de Esterilización (Grande). Termorregulador hidráulico a capilar. Indicadores lumínicos de Resistencia y funcionamiento. Reloj de corte de 3 horas con alarma y función llave. Exactitud: +- 1,4% del valor final de temperatura. 2 estantes tipo rejilla regulables (5 posiciones). Extensión de garantía gratuita a 2 años.",
                "image": "https://placehold.co/400x300?text=Estufa+Esterilizacion",
                "features": ["Termorregulador hidráulico", "Reloj de corte", "Grande"],
                "dimensions": {"length": 60, "width": 40, "height": 40, "unit": "cm"},
                "temperature": {"min": 50, "max": 200, "unit": "°C"},
                "order": 30,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "se60ad",
                "name": "Estufa de Esterilización SE60AD",
                "category": "esterilizacion",
                "description": "Estufa de Esterilización (Grande). Control Digital PID EcoLogic con Autotuning. Doble visor de temperatura Interna y Parámetro programado. Decrece el tiempo a partir de llegar a la temperatura programada. Indicadores lumínicos de Resistencia, Alarma y Autotuning. Alarma sonora por sobretemperatura y finalización de ciclo. Exactitud: al grado centígrado. 2 Estantes tipo Rejilla regulables (5 posiciones). Extensión de garantía gratuita a 2 años.",
                "image": "https://placehold.co/400x300?text=Estufa+Esterilizacion",
                "features": ["Control Digital PID", "EcoLogic", "Autotuning", "Grande"],
                "dimensions": {"length": 60, "width": 40, "height": 40, "unit": "cm"},
                "temperature": {"min": 50, "max": 200, "unit": "°C"},
                "order": 31,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "se70t",
                "name": "Estufa de Esterilización SE70T",
                "category": "esterilizacion",
                "description": "Estufa de Esterilización (Grande). Termorregulador hidráulico a capilar. Indicadores lumínicos de Resistencia y funcionamiento. Interruptor de corte de funcionamiento. Exactitud: +- 1,4% del valor final de temperatura. 2 estantes tipo rejilla regulables (6 posiciones). Extensión de garantía gratuita a 2 años.",
                "image": "https://placehold.co/400x300?text=Estufa+Esterilizacion",
                "features": ["Termorregulador hidráulico", "Grande", "Esterilización"],
                "dimensions": {"length": 70, "width": 50, "height": 50, "unit": "cm"},
                "temperature": {"min": 50, "max": 200, "unit": "°C"},
                "order": 32,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "se70a",
                "name": "Estufa de Esterilización SE70A",
                "category": "esterilizacion",
                "description": "Estufa de Esterilización (Grande). Termorregulador hidráulico a capilar. Indicadores lumínicos de Resistencia y funcionamiento. Reloj de corte de 3 horas con alarma y función llave. Exactitud: +- 1,4% del valor final de temperatura. 2 estantes tipo rejilla regulables (6 posiciones). Extensión de garantía gratuita a 2 años.",
                "image": "https://placehold.co/400x300?text=Estufa+Esterilizacion",
                "features": ["Termorregulador hidráulico", "Reloj de corte", "Grande"],
                "dimensions": {"length": 70, "width": 50, "height": 50, "unit": "cm"},
                "temperature": {"min": 50, "max": 200, "unit": "°C"},
                "order": 33,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "se70ad",
                "name": "Estufa de Esterilización SE70AD",
                "category": "esterilizacion",
                "description": "Estufa de Esterilización (Grande). Control Digital PID EcoLogic con Autotuning. Doble visor de temperatura Interna y Parámetro programado. Decrece el tiempo a partir de llegar a la temperatura programada. Indicadores lumínicos de Resistencia, Alarma y Autotuning. Alarma sonora por sobretemperatura y finalización de ciclo. Exactitud: al grado centígrado. 2 Estantes tipo Rejilla regulables (6 posiciones). Extensión de garantía gratuita a 2 años.",
                "image": "https://placehold.co/400x300?text=Estufa+Esterilizacion",
                "features": ["Control Digital PID", "EcoLogic", "Autotuning", "Grande"],
                "dimensions": {"length": 70, "width": 50, "height": 50, "unit": "cm"},
                "temperature": {"min": 50, "max": 200, "unit": "°C"},
                "order": 34,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "so22t",
                "name": "Estufa de Esterilización SO22T",
                "category": "esterilizacion",
                "description": "Estufa de Esterilización (Pequeña). Termorregulador hidráulico a capilar. Indicadores lumínicos de Resistencia y funcionamiento. Interruptor de corte de funcionamiento. Exactitud: +- 1,4% del valor final de temperatura. 3 bandejas de acero inoxidable y un sacabandejas. Extensión de garantía gratuita a 2 años.",
                "image": "https://placehold.co/400x300?text=Estufa+Esterilizacion",
                "features": ["Termorregulador hidráulico", "Bandejas de acero inoxidable", "Pequeña"],
                "dimensions": {"length": 22, "width": 17, "height": 17, "unit": "cm"},
                "temperature": {"min": 50, "max": 200, "unit": "°C"},
                "order": 35,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "so25a",
                "name": "Estufa de Esterilización SO25A",
                "category": "esterilizacion",
                "description": "Estufa de Esterilización (Pequeña). Termorregulador hidráulico a capilar. Indicadores lumínicos de Resistencia y funcionamiento. Reloj de corte de 3 horas con alarma y función llave. Exactitud: +- 1,4% del valor final de temperatura. 4 bandejas de acero inoxidable y un sacabandejas. Extensión de garantía gratuita a 2 años.",
                "image": "https://placehold.co/400x300?text=Estufa+Esterilizacion",
                "features": ["Termorregulador hidráulico", "Reloj de corte", "Bandejas de acero inoxidable"],
                "dimensions": {"length": 25, "width": 20, "height": 20, "unit": "cm"},
                "temperature": {"min": 50, "max": 200, "unit": "°C"},
                "order": 36,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "so33a",
                "name": "Estufa de Esterilización SO33A",
                "category": "esterilizacion",
                "description": "Estufa de Esterilización (Pequeña). Termorregulador hidráulico a capilar. Indicadores lumínicos de Resistencia y funcionamiento. Reloj de corte de 3 horas con alarma y función llave. Exactitud: +- 1,4% del valor final de temperatura. 3 estantes tipo rejilla regulables y 9 bandejas. Extensión de garantía gratuita a 2 años.",
                "image": "https://placehold.co/400x300?text=Estufa+Esterilizacion",
                "features": ["Termorregulador hidráulico", "Reloj de corte", "Bandejas de acero inoxidable"],
                "dimensions": {"length": 33, "width": 20, "height": 20, "unit": "cm"},
                "temperature": {"min": 50, "max": 200, "unit": "°C"},
                "order": 37,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "se40adbf",
                "name": "Estufa de Esterilización SE40ADF",
                "category": "esterilizacion",
                "description": "Estufa de Esterilización (Grande). Circulación de aire forzado. Control Digital PID EcoLogic con Autotuning. Doble visor de temperatura Interna y Parámetro programado. Decrece el tiempo a partir de llegar a la temperatura programada. Indicadores lumínicos de Resistencia, Alarma y Autotuning. Alarma sonora por sobretemperatura y finalización de ciclo. Exactitud: al grado centígrado. 2 Estantes tipo Rejilla regulables (6 posiciones).",
                "image": "https://placehold.co/400x300?text=Estufa+Esterilizacion",
                "features": ["Circulación de aire forzado", "Control Digital PID", "EcoLogic", "Autotuning"],
                "dimensions": {"length": 40, "width": 60, "height": 40, "unit": "cm"},
                "temperature": {"min": 50, "max": 200, "unit": "°C"},
                "order": 38,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "se40adfs",
                "name": "Estufa de Esterilización SE40ADFS",
                "category": "esterilizacion",
                "description": "Estufa de Esterilización (Grande). Circulación de aire forzado. Control Digital PID EcoLogic con Autotuning. Doble visor de temperatura Interna y Parámetro programado. Decrece el tiempo a partir de llegar a la temperatura programada. Indicadores lumínicos de Resistencia, Alarma y Autotuning. Alarma sonora por sobretemperatura y finalización de ciclo. Termostato de seguridad. Exactitud: al grado centígrado. 2 Estantes tipo Rejilla regulables (6 posiciones).",
                "image": "https://placehold.co/400x300?text=Estufa+Esterilizacion",
                "features": ["Circulación de aire forzado", "Control Digital PID", "Termostato de seguridad"],
                "dimensions": {"length": 40, "width": 60, "height": 40, "unit": "cm"},
                "temperature": {"min": 50, "max": 200, "unit": "°C"},
                "order": 39,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },

            # --- ESTUFAS DE SECADO ---
            {
                "id": "sl30s",
                "name": "Estufa de Secado SL30S",
                "category": "secado",
                "description": "Estufa de Secado (Mediana). Termorregulador hidráulico a capilar. Indicadores lumínicos de Resistencia y funcionamiento. Interruptor de corte de funcionamiento. Exactitud: +- 1,4% del valor final de temperatura. 2 estantes tipo rejilla regulables (5 posiciones). Extensión de garantía gratuita a 2 años.",
                "image": "https://placehold.co/400x300?text=Estufa+Secado",
                "features": ["Termorregulador hidráulico", "Secado", "Mediana"],
                "dimensions": {"length": 30, "width": 40, "height": 30, "unit": "cm"},
                "temperature": {"min": 50, "max": 200, "unit": "°C"},
                "order": 40,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "sl30sdb",
                "name": "Estufa de Secado SL30SDB",
                "category": "secado",
                "description": "Estufa de Secado (Mediana). Control Digital de Temperatura Autotuning PID Sistema BLAST. Doble visor de temperatura Interna y Programada. Indicadores lumínicos de Resistencia y de Alarma. Exactitud: +- 0,1ºC. 2 Estantes tipo Rejilla (5 posiciones). Extensión de garantía gratuita a 2 años.",
                "image": "https://placehold.co/400x300?text=Estufa+Secado",
                "features": ["Control Digital PID", "Sistema BLAST", "Secado"],
                "dimensions": {"length": 30, "width": 40, "height": 30, "unit": "cm"},
                "temperature": {"min": 50, "max": 200, "unit": "°C"},
                "order": 41,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "sl60s",
                "name": "Estufa de Secado SL60S",
                "category": "secado",
                "description": "Estufa de Secado (Grande). Termorregulador hidráulico a capilar. Indicadores lumínicos de Resistencia y funcionamiento. Interruptor de corte de funcionamiento. Exactitud: +- 1,4% del valor final de temperatura. 2 estantes tipo rejilla regulables (5 posiciones). Extensión de garantía gratuita a 2 años.",
                "image": "https://placehold.co/400x300?text=Estufa+Secado",
                "features": ["Termorregulador hidráulico", "Secado", "Grande"],
                "dimensions": {"length": 60, "width": 40, "height": 40, "unit": "cm"},
                "temperature": {"min": 50, "max": 200, "unit": "°C"},
                "order": 42,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "sl60sdb",
                "name": "Estufa de Secado SL60SDB",
                "category": "secado",
                "description": "Estufa de Secado (Grande). Control Digital de Temperatura Autotuning PID Sistema BLAST. Doble visor de temperatura Interna y Programada. Indicadores lumínicos de Resistencia y de Alarma. Exactitud: +- 0,1ºC. 2 Estantes tipo Rejilla (5 posiciones). Extensión de garantía gratuita a 2 años.",
                "image": "https://placehold.co/400x300?text=Estufa+Secado",
                "features": ["Control Digital PID", "Sistema BLAST", "Secado"],
                "dimensions": {"length": 60, "width": 40, "height": 40, "unit": "cm"},
                "temperature": {"min": 50, "max": 200, "unit": "°C"},
                "order": 43,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "sl70s",
                "name": "Estufa de Secado SL70S",
                "category": "secado",
                "description": "Estufa de Secado (Grande). Termorregulador hidráulico a capilar. Indicadores lumínicos de Resistencia y funcionamiento. Interruptor de corte de funcionamiento. Exactitud: +- 1,4% del valor final de temperatura. 2 estantes tipo rejilla regulables (6 posiciones). Extensión de garantía gratuita a 2 años.",
                "image": "https://placehold.co/400x300?text=Estufa+Secado",
                "features": ["Termorregulador hidráulico", "Secado", "Grande"],
                "dimensions": {"length": 70, "width": 50, "height": 50, "unit": "cm"},
                "temperature": {"min": 50, "max": 200, "unit": "°C"},
                "order": 44,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "sl70sdb",
                "name": "Estufa de Secado SL70SDB",
                "category": "secado",
                "description": "Estufa de Secado (Grande). Control Digital de Temperatura Autotuning PID Sistema BLAST. Doble visor de temperatura Interna y Programada. Indicadores lumínicos de Resistencia y de Alarma. Exactitud: +- 0,1ºC. 2 Estantes tipo Rejilla (6 posiciones). Extensión de garantía gratuita a 2 años.",
                "image": "https://placehold.co/400x300?text=Estufa+Secado",
                "features": ["Control Digital PID", "Sistema BLAST", "Secado"],
                "dimensions": {"length": 70, "width": 50, "height": 50, "unit": "cm"},
                "temperature": {"min": 50, "max": 200, "unit": "°C"},
                "order": 45,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "sl40adbf",
                "name": "Estufa de Secado SL40ADBF",
                "category": "secado",
                "description": "Estufa de Secado (Grande). Circulación de aire forzada. Control Digital de Temperatura Autotuning PID Sistema BLAST. Doble visor de temperatura Interna y Programada. Indicadores lumínicos de Resistencia y de Alarma. Exactitud: +- 0,1ºC. 2 Estantes tipo Rejilla (6 posiciones). Extensión de garantía gratuita a 2 años.",
                "image": "https://placehold.co/400x300?text=Estufa+Secado",
                "features": ["Circulación de aire forzada", "Control Digital PID", "Sistema BLAST"],
                "dimensions": {"length": 40, "width": 60, "height": 40, "unit": "cm"},
                "temperature": {"min": 50, "max": 200, "unit": "°C"},
                "order": 46,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            },
            {
                "id": "sl40adbf-ecologic",
                "name": "Estufa de Secado SL40ADBF (EcoLogic)",
                "category": "secado",
                "description": "Estufa de Secado (Grande). Circulación de aire forzado. Control Digital PID EcoLogic BLAST con Autotuning. Doble visor de temperatura Interna y Parámetro programado. Decrece el tiempo a partir de llegar a la temperatura programada. Indicadores lumínicos de Resistencia, Alarma y Autotuning. Alarma sonora por sobretemperatura y finalización de ciclo. Exactitud: +- 0,1ºC. 2 Estantes tipo Rejilla regulables (6 posiciones).",
                "image": "https://placehold.co/400x300?text=Estufa+Secado",
                "features": ["Circulación de aire forzado", "Control Digital PID", "EcoLogic BLAST"],
                "dimensions": {"length": 40, "width": 60, "height": 40, "unit": "cm"},
                "temperature": {"min": 50, "max": 200, "unit": "°C"},
                "order": 47,
                "technical_sheet": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
            }
        ]

        for product_data in products_data:
            product = Product(**product_data)
            db.add(product)
        
        db.commit()
        logger.info("Products seeded successfully!")
        # --- SEED DOWNLOADS ---
        logger.info("Seeding Downloads...")
        from app.models.download import Download
        
        all_roles = ["admin", "usuario_nacional", "usuario_internacional", "distribuidor_nacional", "distribuidor_internacional"]
        distributor_roles = ["admin", "distribuidor_nacional", "distribuidor_internacional"]
        
        downloads_data = [
            {"title": "Conexiones Estufas Serie SSDB SR4520", "category": "Información Técnica", "allowed_roles": all_roles},
            {"title": "Conexiones Estufas Serie SC", "category": "Información Técnica", "allowed_roles": all_roles},
            {"title": "Conexiones Estufas Serie SAD", "category": "Información Técnica", "allowed_roles": all_roles},
            {"title": "Conexiones Estufas Serie SA", "category": "Información Técnica", "allowed_roles": all_roles},
            {"title": "Conexiones Estufas Serie S", "category": "Información Técnica", "allowed_roles": all_roles},
            {"title": "Conexiones Estufas Serie SCDB SR4520", "category": "Información Técnica", "allowed_roles": all_roles},
            {"title": "Manual de estufa Secado Esterilización Serie ST V05 - ESP", "category": "Manuales", "allowed_roles": all_roles},
            {"title": "Manual de estufa Secado Esterilización automática digital Serie SADF V01 - ESP", "category": "Manuales", "allowed_roles": all_roles},
            {"title": "Manual de estufa Esterilización automática Serie SA V06 - ESP", "category": "Manuales", "allowed_roles": all_roles},
            {"title": "Manual de estufa Secado digital BLAST Serie SSDB SR4520 V01 - ESP", "category": "Manuales", "allowed_roles": all_roles},
            {"title": "Manual de estufa Esterilización automática digital Serie SAD V06 - ESP", "category": "Manuales", "allowed_roles": all_roles},
            {"title": "Manual de estufa Cultivo electrónico Serie SC V06 - ESP", "category": "Manuales", "allowed_roles": all_roles},
            {"title": "Manual de estufa Cultivo digital BLAST Serie SCDB SR4520 V02 - ESP", "category": "Manuales", "allowed_roles": all_roles},
            {"title": "Catálogo de estufas SAN JOR para Secado", "category": "Catálogos", "allowed_roles": all_roles},
            {"title": "Catálogo de estufas SAN JOR para Laboratorio", "category": "Catálogos", "allowed_roles": all_roles},
            {"title": "Catálogo de estufas SAN JOR para Cultivo", "category": "Catálogos", "allowed_roles": all_roles},
            {"title": "Catálogo de estufas SAN JOR de Esterilización", "category": "Catálogos", "allowed_roles": all_roles},
            {"title": "Lista de Precios SAN JOR 2021-09", "category": "Lista de Precios", "allowed_roles": distributor_roles},
            {"title": "IN-03 Reglamentación para Tatuadores", "category": "Información Técnica", "allowed_roles": all_roles},
            {"title": "IN-02 Esterilizacion de Instrumental Métodos", "category": "Información Técnica", "allowed_roles": all_roles},
        ]

        for dl_data in downloads_data:
            dl = Download(
                title=dl_data["title"],
                category=dl_data["category"],
                file_url="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
                language="ES",
                allowed_roles=dl_data["allowed_roles"],
                description="Folleto"
            )
            db.add(dl)
        
        db.commit()
        logger.info("Downloads seeded successfully!")

        # --- SEED HISTORY ---
        logger.info("Seeding History...")
        from app.models.history import History
        
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
            history_entry = History(**item)
            db.add(history_entry)
        
        db.commit()
        logger.info("History seeded successfully!")

        # --- SEED CAROUSEL ---
        logger.info("Seeding Carousel...")
        from app.models.carousel import CarouselItem
        
        carousel_data = [
            {
                "image": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
                "title": "Excelencia en Equipamiento de Laboratorio",
                "subtitle": "Más de 50 años brindando precisión y calidad en cada equipo.",
                "order": 1
            },
            {
                "image": "https://images.unsplash.com/photo-1581093458891-9f30220728b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
                "title": "Innovación y Tecnología",
                "subtitle": "Sistemas avanzados de control y diseño para resultados confiables.",
                "order": 2
            },
            {
                "image": "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
                "title": "Soluciones a Medida",
                "subtitle": "Desarrollamos equipos especiales adaptados a sus necesidades específicas.",
                "order": 3
            }
        ]

        for item in carousel_data:
            carousel_entry = CarouselItem(**item)
            db.add(carousel_entry)
        
        db.commit()
        logger.info("Carousel seeded successfully!")

    except Exception as e:
        logger.error(f"Error seeding data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_all()
