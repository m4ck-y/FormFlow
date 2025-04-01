from infrastructure.database import Base, engine
from infrastructure.models.form import ModelForm
from infrastructure.models.question import ModelQuestion
from infrastructure.models.answer import ModelAnswer
from infrastructure.models.conditional_logic import ModelConditionalLogic
from infrastructure.models.auth.otp import ModelOTP

# Crea todas las tablas
Base.metadata.create_all(bind=engine)

"""
Cargar todos los modelos de manera automática
En un archivo que se encargue de la inicialización de la base de datos, como infrastructure/database/init_db.py, puedes usar una técnica para cargar todos los modelos que están en tu proyecto. Este es un ejemplo usando el módulo importlib para buscar dinámicamente todos los modelos en un directorio:

import os
import importlib
from pathlib import Path

def load_models(base, models_module_path):
    "Carga dinámicamente todos los modelos en la ruta especificada."
    models_path = Path(models_module_path)
    for model_file in models_path.glob("*.py"):
        if model_file.stem == "__init__":  # Evitar el init.py
            continue
        # Importa el archivo de modelo
        module_name = f"infrastructure.database.models.{model_file.stem}"
        importlib.import_module(module_name)

    # Crea todas las tablas
    base.metadata.create_all(bind=engine)  # 'engine' debe estar configurado en otro lugar


# Llama esta función para cargar los modelos
load_models(Base, "infrastructure/database/models")
Este código cargará todos los modelos que estén dentro de infrastructure/database/models/, pero hay algunas cosas que debes ajustar dependiendo de cómo manejes la configuración de tu base de datos y el motor (engine).
"""


