from app.utils.log import log_info
from app.base.infrastructure.database.implementation.create import BaseCreate
from app.form.infrastructure.database.model.target_sex import ModelTargetSex
from app.form.domain.schemas.target_sex import SchemaCreateDBTargetSex

def CreateTargetSex(entity: SchemaCreateDBTargetSex, db, auto_commit = True) -> int:
    log_info("before:, ", entity)
    return BaseCreate(ModelTargetSex, entity, db, auto_commit)