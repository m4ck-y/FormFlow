from app.form.infrastructure.database.model.form import ModelForm
from app.form.infrastructure.database.model.estimated_duration import ModelEstimatedDuration
from app.form.infrastructure.database.model.age_group import ModelAgeGroup, target_age_group
from app.form.infrastructure.database.model.target_sex import ModelTargetSex
from app.form.infrastructure.database.model.reference import ModelReference
from app.form.infrastructure.database.model.what_it_evaluate import ModelWhatItEvaluate
from app.form.infrastructure.database.model.category import form_category, ModelCategory
from app.form.infrastructure.database.model.cie11_code import ModelCIE11Code
from app.form.infrastructure.database.model.condition import ModelFormCondition

from app.config.db import Session, engine, TSession
from app.utils.log import log_error, log_info, log_info_cyan


def init():
    log_info("init FORM")
    

def seeder_form():
    log_info("SEEDER")
    session = Session()

    try:
        seeder_category(session)
    except Exception as e:
        log_error("Error al insertar las categorias del form:" + str(e))
        return
    

    

def seeder_category(session: TSession):

    if session.query(ModelCategory).first():
        log_info("Las categorias del form ya existen, no se insertaran de nuevo")
        return
    
    key_industry = 1
    categories = [
        ModelCategory(key_industry=key_industry, name="Bienestar Fisico"),
        ModelCategory(key_industry=key_industry, name="Bienestar Nutricional"),
        ModelCategory(key_industry=key_industry, name="Bienestar Social"),
        ModelCategory(key_industry=key_industry, name="Bienestar Mental")
    ]

    session.bulk_save_objects(categories)
    session.commit()

    log_info("Categorias del form insertadas correctamente")

log_info_cyan("app/form/infrastructure/database/init.py")