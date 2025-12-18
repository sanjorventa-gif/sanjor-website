
import json

products_data = [
    # --- CAJAS DE ACERO INOXIDABLE ---
    {
        "name": "Caja de Acero Inoxidable SC-17-7-3",
        "category": "cajas",
        "description": "Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma. Especial para ortopedia.",
        "image": "https://via.placeholder.com/400x300?text=Caja+Acero+Inoxidable",
        "features": ["Acero Inoxidable 304º 18/8", "Soldadura por plasma", "Alta calidad para ortopedia"],
        "dimensions": {"length": 17, "width": 7, "height": 3, "unit": "cm"},
        "order": 100,
    },
    {
        "name": "Caja de Acero Inoxidable SC-20-10-4",
        "category": "cajas",
        "description": "Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.",
        "image": "https://via.placeholder.com/400x300?text=Caja+Acero+Inoxidable",
        "features": ["Acero Inoxidable 304º 18/8", "Soldadura por plasma"],
        "dimensions": {"length": 20, "width": 10, "height": 4, "unit": "cm"},
        "order": 100,
    },
    {
        "name": "Caja de Acero Inoxidable SC-20-10-5",
        "category": "cajas",
        "description": "Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.",
        "image": "https://via.placeholder.com/400x300?text=Caja+Acero+Inoxidable",
        "features": ["Acero Inoxidable 304º 18/8", "Soldadura por plasma"],
        "dimensions": {"length": 20, "width": 10, "height": 5, "unit": "cm"},
        "order": 100,
    },
    {
        "name": "Caja de Acero Inoxidable SC-22-12-5",
        "category": "cajas",
        "description": "Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.",
        "image": "https://via.placeholder.com/400x300?text=Caja+Acero+Inoxidable",
        "features": ["Acero Inoxidable 304º 18/8", "Soldadura por plasma"],
        "dimensions": {"length": 22, "width": 12, "height": 5, "unit": "cm"},
        "order": 100,
    },
    {
        "name": "Caja de Acero Inoxidable SC-25-12-6",
        "category": "cajas",
        "description": "Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.",
        "image": "https://via.placeholder.com/400x300?text=Caja+Acero+Inoxidable",
        "features": ["Acero Inoxidable 304º 18/8", "Soldadura por plasma"],
        "dimensions": {"length": 25, "width": 12, "height": 6, "unit": "cm"},
        "order": 100,
    },
    {
        "name": "Caja de Acero Inoxidable SC-28-14-6",
        "category": "cajas",
        "description": "Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.",
        "image": "https://via.placeholder.com/400x300?text=Caja+Acero+Inoxidable",
        "features": ["Acero Inoxidable 304º 18/8", "Soldadura por plasma"],
        "dimensions": {"length": 28, "width": 14, "height": 6, "unit": "cm"},
        "order": 100,
    },
    {
        "name": "Caja de Acero Inoxidable SC-32-12-7",
        "category": "cajas",
        "description": "Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.",
        "image": "https://via.placeholder.com/400x300?text=Caja+Acero+Inoxidable",
        "features": ["Acero Inoxidable 304º 18/8", "Soldadura por plasma"],
        "dimensions": {"length": 32, "width": 12, "height": 7, "unit": "cm"},
        "order": 100,
    },
    {
        "name": "Caja de Acero Inoxidable SC-32-15-6",
        "category": "cajas",
        "description": "Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.",
        "image": "https://via.placeholder.com/400x300?text=Caja+Acero+Inoxidable",
        "features": ["Acero Inoxidable 304º 18/8", "Soldadura por plasma"],
        "dimensions": {"length": 32, "width": 15, "height": 6, "unit": "cm"},
        "order": 100,
    },
    {
        "name": "Caja de Acero Inoxidable SC-34-16-7",
        "category": "cajas",
        "description": "Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.",
        "image": "https://via.placeholder.com/400x300?text=Caja+Acero+Inoxidable",
        "features": ["Acero Inoxidable 304º 18/8", "Soldadura por plasma"],
        "dimensions": {"length": 34, "width": 16, "height": 7, "unit": "cm"},
        "order": 100,
    },
    {
        "name": "Caja de Acero Inoxidable SC-35-17-8",
        "category": "cajas",
        "description": "Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.",
        "image": "https://via.placeholder.com/400x300?text=Caja+Acero+Inoxidable",
        "features": ["Acero Inoxidable 304º 18/8", "Soldadura por plasma"],
        "dimensions": {"length": 35, "width": 17, "height": 8, "unit": "cm"},
        "order": 100,
    },
    {
        "name": "Caja de Acero Inoxidable SC-40-20-8",
        "category": "cajas",
        "description": "Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.",
        "image": "https://via.placeholder.com/400x300?text=Caja+Acero+Inoxidable",
        "features": ["Acero Inoxidable 304º 18/8", "Soldadura por plasma"],
        "dimensions": {"length": 40, "width": 20, "height": 8, "unit": "cm"},
        "order": 100,
    },
    {
        "name": "Caja de Acero Inoxidable SC-40-20-10",
        "category": "cajas",
        "description": "Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.",
        "image": "https://via.placeholder.com/400x300?text=Caja+Acero+Inoxidable",
        "features": ["Acero Inoxidable 304º 18/8", "Soldadura por plasma"],
        "dimensions": {"length": 40, "width": 20, "height": 10, "unit": "cm"},
        "order": 100,
    },
    {
        "name": "Caja de Acero Inoxidable SC-40-30-10",
        "category": "cajas",
        "description": "Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.",
        "image": "https://via.placeholder.com/400x300?text=Caja+Acero+Inoxidable",
        "features": ["Acero Inoxidable 304º 18/8", "Soldadura por plasma"],
        "dimensions": {"length": 40, "width": 30, "height": 10, "unit": "cm"},
        "order": 100,
    },
    {
        "name": "Caja de Acero Inoxidable SC-45-20-10",
        "category": "cajas",
        "description": "Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.",
        "image": "https://via.placeholder.com/400x300?text=Caja+Acero+Inoxidable",
        "features": ["Acero Inoxidable 304º 18/8", "Soldadura por plasma"],
        "dimensions": {"length": 45, "width": 20, "height": 10, "unit": "cm"},
        "order": 100,
    },
    {
        "name": "Caja de Acero Inoxidable SC-45-25-10",
        "category": "cajas",
        "description": "Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.",
        "image": "https://via.placeholder.com/400x300?text=Caja+Acero+Inoxidable",
        "features": ["Acero Inoxidable 304º 18/8", "Soldadura por plasma"],
        "dimensions": {"length": 45, "width": 25, "height": 10, "unit": "cm"},
        "order": 100,
    },
    {
        "name": "Caja de Acero Inoxidable SC-45-30-10",
        "category": "cajas",
        "description": "Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.",
        "image": "https://via.placeholder.com/400x300?text=Caja+Acero+Inoxidable",
        "features": ["Acero Inoxidable 304º 18/8", "Soldadura por plasma"],
        "dimensions": {"length": 45, "width": 30, "height": 10, "unit": "cm"},
        "order": 100,
    },
    {
        "name": "Caja de Acero Inoxidable SC-50-20-10",
        "category": "cajas",
        "description": "Caja fabricada en acero inoxidable 304º 18/8 (antimagnético/quirúrgico) con soldadura por plasma.",
        "image": "https://via.placeholder.com/400x300?text=Caja+Acero+Inoxidable",
        "features": ["Acero Inoxidable 304º 18/8", "Soldadura por plasma"],
        "dimensions": {"length": 50, "width": 20, "height": 10, "unit": "cm"},
        "order": 100,
    },

    # --- ESTUFAS DE CULTIVO ---
    {
        "name": "Estufa de Cultivo SL17C",
        "category": "cultivo",
        "description": "Estufa para Cultivo (Pequeña). Preparada para uso continuo y de fácil manejo.",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Cultivo",
        "features": ["Uso continuo", "Fácil manejo", "Investigación y Laboratorio"],
        "temperature": {"min": 20, "max": 70, "unit": "°C"},
        "order": 0,
    },
    {
        "name": "Estufa de Cultivo SL17CDB",
        "category": "cultivo",
        "description": "Estufa para Cultivo (Pequeña). Control digital.",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Cultivo",
        "features": ["Control Digital", "Uso continuo"],
        "temperature": {"min": 0, "max": 80, "unit": "°C"},
        "order": 0,
    },
    {
        "name": "Estufa de Cultivo SL17CADB",
        "category": "cultivo",
        "description": "Estufa para Cultivo (Pequeña). Alta precisión.",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Cultivo",
        "features": ["Alta precisión", "Control Digital"],
        "temperature": {"min": 0, "max": 80, "unit": "°C"},
        "order": 0,
    },
    {
        "name": "Estufa de Cultivo SL20C",
        "category": "cultivo",
        "description": "Estufa para Cultivo (Pequeña).",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Cultivo",
        "features": ["Uso continuo", "Convección natural"],
        "temperature": {"min": 20, "max": 70, "unit": "°C"},
        "order": 0,
    },
    {
        "name": "Estufa de Cultivo SL20CDB",
        "category": "cultivo",
        "description": "Estufa para Cultivo (Pequeña).",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Cultivo",
        "features": ["Control Digital", "Uso continuo"],
        "temperature": {"min": 0, "max": 80, "unit": "°C"},
        "order": 0,
    },
    {
        "name": "Estufa de Cultivo SL20CADB",
        "category": "cultivo",
        "description": "Estufa para Cultivo (Pequeña).",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Cultivo",
        "features": ["Alta precisión", "Control Digital"],
        "temperature": {"min": 0, "max": 80, "unit": "°C"},
        "order": 0,
    },
    {
        "name": "Estufa de Cultivo SL30C",
        "category": "cultivo",
        "description": "Estufa para Cultivo (Mediana).",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Cultivo",
        "features": ["Tamaño mediano", "Uso continuo"],
        "temperature": {"min": 20, "max": 70, "unit": "°C"},
        "order": 0,
    },
    {
        "name": "Estufa de Cultivo SL30CDB",
        "category": "cultivo",
        "description": "Estufa para Cultivo (Mediana).",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Cultivo",
        "features": ["Control Digital", "Tamaño mediano"],
        "temperature": {"min": 0, "max": 80, "unit": "°C"},
        "order": 0,
    },
    {
        "name": "Estufa de Cultivo SL30CADB",
        "category": "cultivo",
        "description": "Estufa para Cultivo (Mediana).",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Cultivo",
        "features": ["Alta precisión", "Tamaño mediano"],
        "temperature": {"min": 0, "max": 80, "unit": "°C"},
        "order": 0,
    },
    {
        "name": "Estufa de Cultivo SL60C",
        "category": "cultivo",
        "description": "Estufa para Cultivo (Grande).",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Cultivo",
        "features": ["Gran capacidad", "Uso continuo"],
        "temperature": {"min": 20, "max": 70, "unit": "°C"},
        "order": 0,
    },
    {
        "name": "Estufa de Cultivo SL60CDB",
        "category": "cultivo",
        "description": "Estufa para Cultivo (Grande).",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Cultivo",
        "features": ["Control Digital", "Gran capacidad"],
        "temperature": {"min": 0, "max": 80, "unit": "°C"},
        "order": 0,
    },
    {
        "name": "Estufa de Cultivo SL60CADB",
        "category": "cultivo",
        "description": "Estufa para Cultivo (Grande).",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Cultivo",
        "features": ["Alta precisión", "Gran capacidad"],
        "temperature": {"min": 0, "max": 80, "unit": "°C"},
        "order": 0,
    },

    # --- ESTUFAS DE ESTERILIZACIÓN ---
    {
        "name": "Estufa de Esterilización SE17C",
        "category": "esterilizacion",
        "description": "Estufa de Esterilización (Pequeña).",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Esterilizacion",
        "features": ["Esterilización eficiente", "Uso continuo"],
        "temperature": {"min": 50, "max": 200, "unit": "°C"},
        "order": 0,
    },
    {
        "name": "Estufa de Esterilización SE17CDB",
        "category": "esterilizacion",
        "description": "Estufa de Esterilización (Pequeña). Control Digital.",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Esterilizacion",
        "features": ["Control Digital", "Esterilización precisa"],
        "temperature": {"min": 50, "max": 220, "unit": "°C"},
        "order": 0,
    },
    {
        "name": "Estufa de Esterilización SE17CADB",
        "category": "esterilizacion",
        "description": "Estufa de Esterilización (Pequeña). Alta precisión.",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Esterilizacion",
        "features": ["Alta precisión", "Control Digital"],
        "temperature": {"min": 50, "max": 220, "unit": "°C"},
        "order": 0,
    },
    {
        "name": "Estufa de Esterilización SE20C",
        "category": "esterilizacion",
        "description": "Estufa de Esterilización (Pequeña).",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Esterilizacion",
        "features": ["Uso continuo", "Convección natural"],
        "temperature": {"min": 50, "max": 200, "unit": "°C"},
        "order": 0,
    },
    {
        "name": "Estufa de Esterilización SE20CDB",
        "category": "esterilizacion",
        "description": "Estufa de Esterilización (Pequeña). Control Digital.",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Esterilizacion",
        "features": ["Control Digital", "Uso continuo"],
        "temperature": {"min": 50, "max": 220, "unit": "°C"},
        "order": 0,
    },
    {
        "name": "Estufa de Esterilización SE20CADB",
        "category": "esterilizacion",
        "description": "Estufa de Esterilización (Pequeña). Alta precisión.",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Esterilizacion",
        "features": ["Alta precisión", "Control Digital"],
        "temperature": {"min": 50, "max": 220, "unit": "°C"},
        "order": 0,
    },
    {
        "name": "Estufa de Esterilización SE30C",
        "category": "esterilizacion",
        "description": "Estufa de Esterilización (Mediana).",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Esterilizacion",
        "features": ["Tamaño mediano", "Uso continuo"],
        "temperature": {"min": 50, "max": 200, "unit": "°C"},
        "order": 0,
    },
    {
        "name": "Estufa de Esterilización SE30CDB",
        "category": "esterilizacion",
        "description": "Estufa de Esterilización (Mediana). Control Digital.",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Esterilizacion",
        "features": ["Control Digital", "Tamaño mediano"],
        "temperature": {"min": 50, "max": 220, "unit": "°C"},
        "order": 0,
    },
    {
        "name": "Estufa de Esterilización SE30CADB",
        "category": "esterilizacion",
        "description": "Estufa de Esterilización (Mediana). Alta precisión.",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Esterilizacion",
        "features": ["Alta precisión", "Tamaño mediano"],
        "temperature": {"min": 50, "max": 220, "unit": "°C"},
        "order": 0,
    },
    {
        "name": "Estufa de Esterilización SE60C",
        "category": "esterilizacion",
        "description": "Estufa de Esterilización (Grande).",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Esterilizacion",
        "features": ["Gran capacidad", "Uso continuo"],
        "temperature": {"min": 50, "max": 200, "unit": "°C"},
        "order": 0,
    },
    {
        "name": "Estufa de Esterilización SE60CDB",
        "category": "esterilizacion",
        "description": "Estufa de Esterilización (Grande). Control Digital.",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Esterilizacion",
        "features": ["Control Digital", "Gran capacidad"],
        "temperature": {"min": 50, "max": 220, "unit": "°C"},
        "order": 0,
    },
    {
        "name": "Estufa de Esterilización SE60CADB",
        "category": "esterilizacion",
        "description": "Estufa de Esterilización (Grande). Alta precisión.",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Esterilizacion",
        "features": ["Alta precisión", "Gran capacidad"],
        "temperature": {"min": 50, "max": 220, "unit": "°C"},
        "order": 0,
    },

    # --- ESTUFAS DE SECADO ---
    {
        "name": "Estufa de Secado SS17C",
        "category": "secado",
        "description": "Estufa de Secado (Pequeña).",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Secado",
        "features": ["Secado rápido", "Uso continuo"],
        "temperature": {"min": 50, "max": 200, "unit": "°C"},
        "order": 0,
    },
    {
        "name": "Estufa de Secado SS17CDB",
        "category": "secado",
        "description": "Estufa de Secado (Pequeña). Control Digital.",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Secado",
        "features": ["Control Digital", "Secado eficiente"],
        "temperature": {"min": 50, "max": 220, "unit": "°C"},
        "order": 0,
    },
    {
        "name": "Estufa de Secado SS17CADB",
        "category": "secado",
        "description": "Estufa de Secado (Pequeña). Alta precisión.",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Secado",
        "features": ["Alta precisión", "Control Digital"],
        "temperature": {"min": 50, "max": 220, "unit": "°C"},
        "order": 0,
    },
    {
        "name": "Estufa de Secado SS20C",
        "category": "secado",
        "description": "Estufa de Secado (Pequeña).",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Secado",
        "features": ["Uso continuo", "Convección natural"],
        "temperature": {"min": 50, "max": 200, "unit": "°C"},
        "order": 0,
    },
    {
        "name": "Estufa de Secado SS20CDB",
        "category": "secado",
        "description": "Estufa de Secado (Pequeña). Control Digital.",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Secado",
        "features": ["Control Digital", "Uso continuo"],
        "temperature": {"min": 50, "max": 220, "unit": "°C"},
        "order": 0,
    },
    {
        "name": "Estufa de Secado SS20CADB",
        "category": "secado",
        "description": "Estufa de Secado (Pequeña). Alta precisión.",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Secado",
        "features": ["Alta precisión", "Control Digital"],
        "temperature": {"min": 50, "max": 220, "unit": "°C"},
        "order": 0,
    },
    {
        "name": "Estufa de Secado SS30C",
        "category": "secado",
        "description": "Estufa de Secado (Mediana).",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Secado",
        "features": ["Tamaño mediano", "Uso continuo"],
        "temperature": {"min": 50, "max": 200, "unit": "°C"},
        "order": 0,
    },
    {
        "name": "Estufa de Secado SS30CDB",
        "category": "secado",
        "description": "Estufa de Secado (Mediana). Control Digital.",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Secado",
        "features": ["Control Digital", "Tamaño mediano"],
        "temperature": {"min": 50, "max": 220, "unit": "°C"},
        "order": 0,
    },
    {
        "name": "Estufa de Secado SS30CADB",
        "category": "secado",
        "description": "Estufa de Secado (Mediana). Alta precisión.",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Secado",
        "features": ["Alta precisión", "Tamaño mediano"],
        "temperature": {"min": 50, "max": 220, "unit": "°C"},
        "order": 0,
    },
    {
        "name": "Estufa de Secado SS60C",
        "category": "secado",
        "description": "Estufa de Secado (Grande).",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Secado",
        "features": ["Gran capacidad", "Uso continuo"],
        "temperature": {"min": 50, "max": 200, "unit": "°C"},
        "order": 0,
    },
    {
        "name": "Estufa de Secado SS60CDB",
        "category": "secado",
        "description": "Estufa de Secado (Grande). Control Digital.",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Secado",
        "features": ["Control Digital", "Gran capacidad"],
        "temperature": {"min": 50, "max": 220, "unit": "°C"},
        "order": 0,
    },
    {
        "name": "Estufa de Secado SS60CADB",
        "category": "secado",
        "description": "Estufa de Secado (Grande). Alta precisión.",
        "image": "https://via.placeholder.com/400x300?text=Estufa+Secado",
        "features": ["Alta precisión", "Gran capacidad"],
        "temperature": {"min": 50, "max": 220, "unit": "°C"},
        "order": 0,
    },
]

new_products_data = []

for p in products_data:
    desc = p["description"]
    features_list = p.get("features", [])
    
    # Generate ID if missing
    if "id" not in p:
        p["id"] = p["name"].lower().replace(' ', '-').replace('/', '-').replace('(', '').replace(')', '').replace('.', '')

    # 1. Split description by "."
    sentences = [s.strip() for s in desc.split('.') if s.strip()]
    
    # 2. Merge features
    merged_items = sentences + features_list
    
    # Build HTML list
    html_desc = "<ul>"
    for item in merged_items:
        clean_item = item.rstrip('.')
        html_desc += f"<li>{clean_item}.</li>"
    html_desc += "</ul>"
    
    p["description"] = html_desc
    p["features"] = []
    new_products_data.append(p)

# Generate python code
output_code = """import logging
from app.db.session import SessionLocal
from app.crud import product as crud_product
from app.models.product import Product

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

products_data = """ + json.dumps(new_products_data, indent=4, ensure_ascii=False) + """

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
"""

# Write to backend/app/seed_products.py
with open("t:/PROYECTOS/SANJORVENTA-GIF/sanjor-website/backend/app/seed_products.py", "w", encoding="utf-8") as f:
    f.write(output_code)
