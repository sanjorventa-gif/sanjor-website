import logging
from app.db.session import SessionLocal
from app.crud import product as crud_product
from app.models.product import Product

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

products_data = [
    {
        "name": "Caja de Acero Inoxidable SC-17-7-3",
        "category": "cajas",
        "description": "<ul><li>Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.</li><li>Especial para ortopedia.</li><li>Acero Inoxidable 304º 18/8.</li><li>Soldadura por plasma.</li><li>Alta calidad para ortopedia.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Caja+Acero+Inoxidable",
        "features": [],
        "dimensions": {
            "length": 17,
            "width": 7,
            "height": 3,
            "unit": "cm"
        },
        "order": 100,
        "id": "caja-de-acero-inoxidable-sc-17-7-3"
    },
    {
        "name": "Caja de Acero Inoxidable SC-20-10-4",
        "category": "cajas",
        "description": "<ul><li>Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.</li><li>Acero Inoxidable 304º 18/8.</li><li>Soldadura por plasma.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Caja+Acero+Inoxidable",
        "features": [],
        "dimensions": {
            "length": 20,
            "width": 10,
            "height": 4,
            "unit": "cm"
        },
        "order": 100,
        "id": "caja-de-acero-inoxidable-sc-20-10-4"
    },
    {
        "name": "Caja de Acero Inoxidable SC-20-10-5",
        "category": "cajas",
        "description": "<ul><li>Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.</li><li>Acero Inoxidable 304º 18/8.</li><li>Soldadura por plasma.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Caja+Acero+Inoxidable",
        "features": [],
        "dimensions": {
            "length": 20,
            "width": 10,
            "height": 5,
            "unit": "cm"
        },
        "order": 100,
        "id": "caja-de-acero-inoxidable-sc-20-10-5"
    },
    {
        "name": "Caja de Acero Inoxidable SC-22-12-5",
        "category": "cajas",
        "description": "<ul><li>Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.</li><li>Acero Inoxidable 304º 18/8.</li><li>Soldadura por plasma.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Caja+Acero+Inoxidable",
        "features": [],
        "dimensions": {
            "length": 22,
            "width": 12,
            "height": 5,
            "unit": "cm"
        },
        "order": 100,
        "id": "caja-de-acero-inoxidable-sc-22-12-5"
    },
    {
        "name": "Caja de Acero Inoxidable SC-25-12-6",
        "category": "cajas",
        "description": "<ul><li>Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.</li><li>Acero Inoxidable 304º 18/8.</li><li>Soldadura por plasma.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Caja+Acero+Inoxidable",
        "features": [],
        "dimensions": {
            "length": 25,
            "width": 12,
            "height": 6,
            "unit": "cm"
        },
        "order": 100,
        "id": "caja-de-acero-inoxidable-sc-25-12-6"
    },
    {
        "name": "Caja de Acero Inoxidable SC-28-14-6",
        "category": "cajas",
        "description": "<ul><li>Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.</li><li>Acero Inoxidable 304º 18/8.</li><li>Soldadura por plasma.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Caja+Acero+Inoxidable",
        "features": [],
        "dimensions": {
            "length": 28,
            "width": 14,
            "height": 6,
            "unit": "cm"
        },
        "order": 100,
        "id": "caja-de-acero-inoxidable-sc-28-14-6"
    },
    {
        "name": "Caja de Acero Inoxidable SC-32-12-7",
        "category": "cajas",
        "description": "<ul><li>Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.</li><li>Acero Inoxidable 304º 18/8.</li><li>Soldadura por plasma.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Caja+Acero+Inoxidable",
        "features": [],
        "dimensions": {
            "length": 32,
            "width": 12,
            "height": 7,
            "unit": "cm"
        },
        "order": 100,
        "id": "caja-de-acero-inoxidable-sc-32-12-7"
    },
    {
        "name": "Caja de Acero Inoxidable SC-32-15-6",
        "category": "cajas",
        "description": "<ul><li>Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.</li><li>Acero Inoxidable 304º 18/8.</li><li>Soldadura por plasma.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Caja+Acero+Inoxidable",
        "features": [],
        "dimensions": {
            "length": 32,
            "width": 15,
            "height": 6,
            "unit": "cm"
        },
        "order": 100,
        "id": "caja-de-acero-inoxidable-sc-32-15-6"
    },
    {
        "name": "Caja de Acero Inoxidable SC-34-16-7",
        "category": "cajas",
        "description": "<ul><li>Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.</li><li>Acero Inoxidable 304º 18/8.</li><li>Soldadura por plasma.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Caja+Acero+Inoxidable",
        "features": [],
        "dimensions": {
            "length": 34,
            "width": 16,
            "height": 7,
            "unit": "cm"
        },
        "order": 100,
        "id": "caja-de-acero-inoxidable-sc-34-16-7"
    },
    {
        "name": "Caja de Acero Inoxidable SC-35-17-8",
        "category": "cajas",
        "description": "<ul><li>Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.</li><li>Acero Inoxidable 304º 18/8.</li><li>Soldadura por plasma.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Caja+Acero+Inoxidable",
        "features": [],
        "dimensions": {
            "length": 35,
            "width": 17,
            "height": 8,
            "unit": "cm"
        },
        "order": 100,
        "id": "caja-de-acero-inoxidable-sc-35-17-8"
    },
    {
        "name": "Caja de Acero Inoxidable SC-40-20-8",
        "category": "cajas",
        "description": "<ul><li>Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.</li><li>Acero Inoxidable 304º 18/8.</li><li>Soldadura por plasma.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Caja+Acero+Inoxidable",
        "features": [],
        "dimensions": {
            "length": 40,
            "width": 20,
            "height": 8,
            "unit": "cm"
        },
        "order": 100,
        "id": "caja-de-acero-inoxidable-sc-40-20-8"
    },
    {
        "name": "Caja de Acero Inoxidable SC-40-20-10",
        "category": "cajas",
        "description": "<ul><li>Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.</li><li>Acero Inoxidable 304º 18/8.</li><li>Soldadura por plasma.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Caja+Acero+Inoxidable",
        "features": [],
        "dimensions": {
            "length": 40,
            "width": 20,
            "height": 10,
            "unit": "cm"
        },
        "order": 100,
        "id": "caja-de-acero-inoxidable-sc-40-20-10"
    },
    {
        "name": "Caja de Acero Inoxidable SC-40-30-10",
        "category": "cajas",
        "description": "<ul><li>Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.</li><li>Acero Inoxidable 304º 18/8.</li><li>Soldadura por plasma.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Caja+Acero+Inoxidable",
        "features": [],
        "dimensions": {
            "length": 40,
            "width": 30,
            "height": 10,
            "unit": "cm"
        },
        "order": 100,
        "id": "caja-de-acero-inoxidable-sc-40-30-10"
    },
    {
        "name": "Caja de Acero Inoxidable SC-45-20-10",
        "category": "cajas",
        "description": "<ul><li>Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.</li><li>Acero Inoxidable 304º 18/8.</li><li>Soldadura por plasma.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Caja+Acero+Inoxidable",
        "features": [],
        "dimensions": {
            "length": 45,
            "width": 20,
            "height": 10,
            "unit": "cm"
        },
        "order": 100,
        "id": "caja-de-acero-inoxidable-sc-45-20-10"
    },
    {
        "name": "Caja de Acero Inoxidable SC-45-25-10",
        "category": "cajas",
        "description": "<ul><li>Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.</li><li>Acero Inoxidable 304º 18/8.</li><li>Soldadura por plasma.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Caja+Acero+Inoxidable",
        "features": [],
        "dimensions": {
            "length": 45,
            "width": 25,
            "height": 10,
            "unit": "cm"
        },
        "order": 100,
        "id": "caja-de-acero-inoxidable-sc-45-25-10"
    },
    {
        "name": "Caja de Acero Inoxidable SC-45-30-10",
        "category": "cajas",
        "description": "<ul><li>Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.</li><li>Acero Inoxidable 304º 18/8.</li><li>Soldadura por plasma.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Caja+Acero+Inoxidable",
        "features": [],
        "dimensions": {
            "length": 45,
            "width": 30,
            "height": 10,
            "unit": "cm"
        },
        "order": 100,
        "id": "caja-de-acero-inoxidable-sc-45-30-10"
    },
    {
        "name": "Caja de Acero Inoxidable SC-50-20-10",
        "category": "cajas",
        "description": "<ul><li>Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.</li><li>Acero Inoxidable 304º 18/8.</li><li>Soldadura por plasma.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Caja+Acero+Inoxidable",
        "features": [],
        "dimensions": {
            "length": 50,
            "width": 20,
            "height": 10,
            "unit": "cm"
        },
        "order": 100,
        "id": "caja-de-acero-inoxidable-sc-50-20-10"
    },
    {
        "name": "Estufa de Cultivo SL17C",
        "category": "cultivo",
        "description": "<ul><li>Estufa para Cultivo (Pequeña).</li><li>Preparada para uso continuo y de fácil manejo.</li><li>Uso continuo.</li><li>Fácil manejo.</li><li>Investigación y Laboratorio.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Cultivo",
        "features": [],
        "temperature": {
            "min": 20,
            "max": 70,
            "unit": "°C"
        },
        "order": 0,
        "id": "estufa-de-cultivo-sl17c"
    },
    {
        "name": "Estufa de Cultivo SL17CDB",
        "category": "cultivo",
        "description": "<ul><li>Estufa para Cultivo (Pequeña).</li><li>Control digital.</li><li>Control Digital.</li><li>Uso continuo.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Cultivo",
        "features": [],
        "temperature": {
            "min": 0,
            "max": 80,
            "unit": "°C"
        },
        "order": 0,
        "id": "estufa-de-cultivo-sl17cdb"
    },
    {
        "name": "Estufa de Cultivo SL17CADB",
        "category": "cultivo",
        "description": "<ul><li>Estufa para Cultivo (Pequeña).</li><li>Alta precisión.</li><li>Alta precisión.</li><li>Control Digital.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Cultivo",
        "features": [],
        "temperature": {
            "min": 0,
            "max": 80,
            "unit": "°C"
        },
        "order": 0,
        "id": "estufa-de-cultivo-sl17cadb"
    },
    {
        "name": "Estufa de Cultivo SL20C",
        "category": "cultivo",
        "description": "<ul><li>Estufa para Cultivo (Pequeña).</li><li>Uso continuo.</li><li>Convección natural.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Cultivo",
        "features": [],
        "temperature": {
            "min": 20,
            "max": 70,
            "unit": "°C"
        },
        "order": 0,
        "id": "estufa-de-cultivo-sl20c"
    },
    {
        "name": "Estufa de Cultivo SL20CDB",
        "category": "cultivo",
        "description": "<ul><li>Estufa para Cultivo (Pequeña).</li><li>Control Digital.</li><li>Uso continuo.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Cultivo",
        "features": [],
        "temperature": {
            "min": 0,
            "max": 80,
            "unit": "°C"
        },
        "order": 0,
        "id": "estufa-de-cultivo-sl20cdb"
    },
    {
        "name": "Estufa de Cultivo SL20CADB",
        "category": "cultivo",
        "description": "<ul><li>Estufa para Cultivo (Pequeña).</li><li>Alta precisión.</li><li>Control Digital.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Cultivo",
        "features": [],
        "temperature": {
            "min": 0,
            "max": 80,
            "unit": "°C"
        },
        "order": 0,
        "id": "estufa-de-cultivo-sl20cadb"
    },
    {
        "name": "Estufa de Cultivo SL30C",
        "category": "cultivo",
        "description": "<ul><li>Estufa para Cultivo (Mediana).</li><li>Tamaño mediano.</li><li>Uso continuo.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Cultivo",
        "features": [],
        "temperature": {
            "min": 20,
            "max": 70,
            "unit": "°C"
        },
        "order": 0,
        "id": "estufa-de-cultivo-sl30c"
    },
    {
        "name": "Estufa de Cultivo SL30CDB",
        "category": "cultivo",
        "description": "<ul><li>Estufa para Cultivo (Mediana).</li><li>Control Digital.</li><li>Tamaño mediano.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Cultivo",
        "features": [],
        "temperature": {
            "min": 0,
            "max": 80,
            "unit": "°C"
        },
        "order": 0,
        "id": "estufa-de-cultivo-sl30cdb"
    },
    {
        "name": "Estufa de Cultivo SL30CADB",
        "category": "cultivo",
        "description": "<ul><li>Estufa para Cultivo (Mediana).</li><li>Alta precisión.</li><li>Tamaño mediano.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Cultivo",
        "features": [],
        "temperature": {
            "min": 0,
            "max": 80,
            "unit": "°C"
        },
        "order": 0,
        "id": "estufa-de-cultivo-sl30cadb"
    },
    {
        "name": "Estufa de Cultivo SL60C",
        "category": "cultivo",
        "description": "<ul><li>Estufa para Cultivo (Grande).</li><li>Gran capacidad.</li><li>Uso continuo.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Cultivo",
        "features": [],
        "temperature": {
            "min": 20,
            "max": 70,
            "unit": "°C"
        },
        "order": 0,
        "id": "estufa-de-cultivo-sl60c"
    },
    {
        "name": "Estufa de Cultivo SL60CDB",
        "category": "cultivo",
        "description": "<ul><li>Estufa para Cultivo (Grande).</li><li>Control Digital.</li><li>Gran capacidad.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Cultivo",
        "features": [],
        "temperature": {
            "min": 0,
            "max": 80,
            "unit": "°C"
        },
        "order": 0,
        "id": "estufa-de-cultivo-sl60cdb"
    },
    {
        "name": "Estufa de Cultivo SL60CADB",
        "category": "cultivo",
        "description": "<ul><li>Estufa para Cultivo (Grande).</li><li>Alta precisión.</li><li>Gran capacidad.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Cultivo",
        "features": [],
        "temperature": {
            "min": 0,
            "max": 80,
            "unit": "°C"
        },
        "order": 0,
        "id": "estufa-de-cultivo-sl60cadb"
    },
    {
        "name": "Estufa de Esterilización SE17C",
        "category": "esterilizacion",
        "description": "<ul><li>Estufa de Esterilización (Pequeña).</li><li>Esterilización eficiente.</li><li>Uso continuo.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Esterilizacion",
        "features": [],
        "temperature": {
            "min": 50,
            "max": 200,
            "unit": "°C"
        },
        "order": 0,
        "id": "estufa-de-esterilización-se17c"
    },
    {
        "name": "Estufa de Esterilización SE17CDB",
        "category": "esterilizacion",
        "description": "<ul><li>Estufa de Esterilización (Pequeña).</li><li>Control Digital.</li><li>Control Digital.</li><li>Esterilización precisa.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Esterilizacion",
        "features": [],
        "temperature": {
            "min": 50,
            "max": 220,
            "unit": "°C"
        },
        "order": 0,
        "id": "estufa-de-esterilización-se17cdb"
    },
    {
        "name": "Estufa de Esterilización SE17CADB",
        "category": "esterilizacion",
        "description": "<ul><li>Estufa de Esterilización (Pequeña).</li><li>Alta precisión.</li><li>Alta precisión.</li><li>Control Digital.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Esterilizacion",
        "features": [],
        "temperature": {
            "min": 50,
            "max": 220,
            "unit": "°C"
        },
        "order": 0,
        "id": "estufa-de-esterilización-se17cadb"
    },
    {
        "name": "Estufa de Esterilización SE20C",
        "category": "esterilizacion",
        "description": "<ul><li>Estufa de Esterilización (Pequeña).</li><li>Uso continuo.</li><li>Convección natural.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Esterilizacion",
        "features": [],
        "temperature": {
            "min": 50,
            "max": 200,
            "unit": "°C"
        },
        "order": 0,
        "id": "estufa-de-esterilización-se20c"
    },
    {
        "name": "Estufa de Esterilización SE20CDB",
        "category": "esterilizacion",
        "description": "<ul><li>Estufa de Esterilización (Pequeña).</li><li>Control Digital.</li><li>Control Digital.</li><li>Uso continuo.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Esterilizacion",
        "features": [],
        "temperature": {
            "min": 50,
            "max": 220,
            "unit": "°C"
        },
        "order": 0,
        "id": "estufa-de-esterilización-se20cdb"
    },
    {
        "name": "Estufa de Esterilización SE20CADB",
        "category": "esterilizacion",
        "description": "<ul><li>Estufa de Esterilización (Pequeña).</li><li>Alta precisión.</li><li>Alta precisión.</li><li>Control Digital.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Esterilizacion",
        "features": [],
        "temperature": {
            "min": 50,
            "max": 220,
            "unit": "°C"
        },
        "order": 0,
        "id": "estufa-de-esterilización-se20cadb"
    },
    {
        "name": "Estufa de Esterilización SE30C",
        "category": "esterilizacion",
        "description": "<ul><li>Estufa de Esterilización (Mediana).</li><li>Tamaño mediano.</li><li>Uso continuo.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Esterilizacion",
        "features": [],
        "temperature": {
            "min": 50,
            "max": 200,
            "unit": "°C"
        },
        "order": 0,
        "id": "estufa-de-esterilización-se30c"
    },
    {
        "name": "Estufa de Esterilización SE30CDB",
        "category": "esterilizacion",
        "description": "<ul><li>Estufa de Esterilización (Mediana).</li><li>Control Digital.</li><li>Control Digital.</li><li>Tamaño mediano.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Esterilizacion",
        "features": [],
        "temperature": {
            "min": 50,
            "max": 220,
            "unit": "°C"
        },
        "order": 0,
        "id": "estufa-de-esterilización-se30cdb"
    },
    {
        "name": "Estufa de Esterilización SE30CADB",
        "category": "esterilizacion",
        "description": "<ul><li>Estufa de Esterilización (Mediana).</li><li>Alta precisión.</li><li>Alta precisión.</li><li>Tamaño mediano.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Esterilizacion",
        "features": [],
        "temperature": {
            "min": 50,
            "max": 220,
            "unit": "°C"
        },
        "order": 0,
        "id": "estufa-de-esterilización-se30cadb"
    },
    {
        "name": "Estufa de Esterilización SE60C",
        "category": "esterilizacion",
        "description": "<ul><li>Estufa de Esterilización (Grande).</li><li>Gran capacidad.</li><li>Uso continuo.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Esterilizacion",
        "features": [],
        "temperature": {
            "min": 50,
            "max": 200,
            "unit": "°C"
        },
        "order": 0,
        "id": "estufa-de-esterilización-se60c"
    },
    {
        "name": "Estufa de Esterilización SE60CDB",
        "category": "esterilizacion",
        "description": "<ul><li>Estufa de Esterilización (Grande).</li><li>Control Digital.</li><li>Control Digital.</li><li>Gran capacidad.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Esterilizacion",
        "features": [],
        "temperature": {
            "min": 50,
            "max": 220,
            "unit": "°C"
        },
        "order": 0,
        "id": "estufa-de-esterilización-se60cdb"
    },
    {
        "name": "Estufa de Esterilización SE60CADB",
        "category": "esterilizacion",
        "description": "<ul><li>Estufa de Esterilización (Grande).</li><li>Alta precisión.</li><li>Alta precisión.</li><li>Gran capacidad.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Esterilizacion",
        "features": [],
        "temperature": {
            "min": 50,
            "max": 220,
            "unit": "°C"
        },
        "order": 0,
        "id": "estufa-de-esterilización-se60cadb"
    },
    {
        "name": "Estufa de Secado SS17C",
        "category": "secado",
        "description": "<ul><li>Estufa de Secado (Pequeña).</li><li>Secado rápido.</li><li>Uso continuo.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Secado",
        "features": [],
        "temperature": {
            "min": 50,
            "max": 200,
            "unit": "°C"
        },
        "order": 0,
        "id": "estufa-de-secado-ss17c"
    },
    {
        "name": "Estufa de Secado SS17CDB",
        "category": "secado",
        "description": "<ul><li>Estufa de Secado (Pequeña).</li><li>Control Digital.</li><li>Control Digital.</li><li>Secado eficiente.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Secado",
        "features": [],
        "temperature": {
            "min": 50,
            "max": 220,
            "unit": "°C"
        },
        "order": 0,
        "id": "estufa-de-secado-ss17cdb"
    },
    {
        "name": "Estufa de Secado SS17CADB",
        "category": "secado",
        "description": "<ul><li>Estufa de Secado (Pequeña).</li><li>Alta precisión.</li><li>Alta precisión.</li><li>Control Digital.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Secado",
        "features": [],
        "temperature": {
            "min": 50,
            "max": 220,
            "unit": "°C"
        },
        "order": 0,
        "id": "estufa-de-secado-ss17cadb"
    },
    {
        "name": "Estufa de Secado SS20C",
        "category": "secado",
        "description": "<ul><li>Estufa de Secado (Pequeña).</li><li>Uso continuo.</li><li>Convección natural.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Secado",
        "features": [],
        "temperature": {
            "min": 50,
            "max": 200,
            "unit": "°C"
        },
        "order": 0,
        "id": "estufa-de-secado-ss20c"
    },
    {
        "name": "Estufa de Secado SS20CDB",
        "category": "secado",
        "description": "<ul><li>Estufa de Secado (Pequeña).</li><li>Control Digital.</li><li>Control Digital.</li><li>Uso continuo.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Secado",
        "features": [],
        "temperature": {
            "min": 50,
            "max": 220,
            "unit": "°C"
        },
        "order": 0,
        "id": "estufa-de-secado-ss20cdb"
    },
    {
        "name": "Estufa de Secado SS20CADB",
        "category": "secado",
        "description": "<ul><li>Estufa de Secado (Pequeña).</li><li>Alta precisión.</li><li>Alta precisión.</li><li>Control Digital.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Secado",
        "features": [],
        "temperature": {
            "min": 50,
            "max": 220,
            "unit": "°C"
        },
        "order": 0,
        "id": "estufa-de-secado-ss20cadb"
    },
    {
        "name": "Estufa de Secado SS30C",
        "category": "secado",
        "description": "<ul><li>Estufa de Secado (Mediana).</li><li>Tamaño mediano.</li><li>Uso continuo.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Secado",
        "features": [],
        "temperature": {
            "min": 50,
            "max": 200,
            "unit": "°C"
        },
        "order": 0,
        "id": "estufa-de-secado-ss30c"
    },
    {
        "name": "Estufa de Secado SS30CDB",
        "category": "secado",
        "description": "<ul><li>Estufa de Secado (Mediana).</li><li>Control Digital.</li><li>Control Digital.</li><li>Tamaño mediano.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Secado",
        "features": [],
        "temperature": {
            "min": 50,
            "max": 220,
            "unit": "°C"
        },
        "order": 0,
        "id": "estufa-de-secado-ss30cdb"
    },
    {
        "name": "Estufa de Secado SS30CADB",
        "category": "secado",
        "description": "<ul><li>Estufa de Secado (Mediana).</li><li>Alta precisión.</li><li>Alta precisión.</li><li>Tamaño mediano.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Secado",
        "features": [],
        "temperature": {
            "min": 50,
            "max": 220,
            "unit": "°C"
        },
        "order": 0,
        "id": "estufa-de-secado-ss30cadb"
    },
    {
        "name": "Estufa de Secado SS60C",
        "category": "secado",
        "description": "<ul><li>Estufa de Secado (Grande).</li><li>Gran capacidad.</li><li>Uso continuo.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Secado",
        "features": [],
        "temperature": {
            "min": 50,
            "max": 200,
            "unit": "°C"
        },
        "order": 0,
        "id": "estufa-de-secado-ss60c"
    },
    {
        "name": "Estufa de Secado SS60CDB",
        "category": "secado",
        "description": "<ul><li>Estufa de Secado (Grande).</li><li>Control Digital.</li><li>Control Digital.</li><li>Gran capacidad.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Secado",
        "features": [],
        "temperature": {
            "min": 50,
            "max": 220,
            "unit": "°C"
        },
        "order": 0,
        "id": "estufa-de-secado-ss60cdb"
    },
    {
        "name": "Estufa de Secado SS60CADB",
        "category": "secado",
        "description": "<ul><li>Estufa de Secado (Grande).</li><li>Alta precisión.</li><li>Alta precisión.</li><li>Gran capacidad.</li></ul>",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Secado",
        "features": [],
        "temperature": {
            "min": 50,
            "max": 220,
            "unit": "°C"
        },
        "order": 0,
        "id": "estufa-de-secado-ss60cadb"
    }
]

def seed_products() -> None:
    db = SessionLocal()
    try:
        logger.info("Seeding products...")
        for product_data in products_data:
            existing_product = db.query(Product).filter(Product.name == product_data["name"]).first()
            
            if existing_product:
                logger.info(f"Updating product: {product_data['name']}")
                crud_product.update(db, db_obj=existing_product, obj_in=product_data)
            else:
                logger.info(f"Creating product: {product_data['name']}")
                # Direct creation to enforce ID
                product = Product(**product_data)
                db.add(product)
                db.commit()
                db.refresh(product)
                
        logger.info("Products seeded/updated successfully.")
    except Exception as e:
        logger.error(f"Error seeding products: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_products()
