from app.utils.log import log_info
from app.base.infrastructure.database.implementation.create import BaseCreate
from app.form.infrastructure.database.model.cie11_code import ModelCIE11Code
from app.form.domain.schemas.cie11_code import SRequestCie11Code

def CreateCIE11Code(entity: SRequestCie11Code, db, auto_commit = True) -> int:
    log_info("before:, ", entity)
    return BaseCreate(ModelCIE11Code, entity, db, auto_commit)