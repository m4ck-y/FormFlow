from app.utils.log import log_info
from app.base.infrastructure.database.implementation.create import BaseCreate
from app.form.infrastructure.database.model.age_group import ModelAgeGroup
from app.form.domain.schemas.age_group import SchemaCreateDBAgeGroup

def CreateAgeGroup(entity: SchemaCreateDBAgeGroup, db, auto_commit = True) -> int:
    log_info("before:, ", entity)
    return BaseCreate(ModelAgeGroup, entity, db, auto_commit)