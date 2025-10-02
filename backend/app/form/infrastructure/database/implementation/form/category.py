from app.form.domain.schemas.form_category import SCreateDBFormCategory
from app.base.domain.repository.session import TSession
from app.form.infrastructure.database.model.category import form_categories as Table
from app.utils.log import log_error, log_info
from app.base.domain.schemas.str_schema_json import str_schema_json

# insercion de una tabla intermedia
def CreateFormCategory(db:TSession, value:SCreateDBFormCategory , auto_commit = True) -> int:
    log_info(value)
    stmt = Table.insert().values(**value.model_dump())
    result = db.execute(stmt)
    if auto_commit:
        db.commit()
    pk = result.inserted_primary_key

    if pk and len(pk) > 0 and pk[0] is not None:
        return pk[0]
    log_error("pk: " + str(type(pk)) + " " + str(pk))
    err = "No se pudo obtener la llave primaria"
    log_error(err)
    raise ValueError(err)

