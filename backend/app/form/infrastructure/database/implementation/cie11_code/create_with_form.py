from app.base.domain.repository.session import TSession
from app.form.domain.schemas.form_cie11_codes import SInsertFormCie11Codes
from app.form.infrastructure.database.model.cie11_code import form_cie11_codes
from app.utils.log import log_error

def CreateCIE11CodeWithForm(db:TSession, value:SInsertFormCie11Codes, auto_commit = False) -> int:
    smt = form_cie11_codes.insert().values(**value.model_dump())
    result = db.execute(smt)

    if auto_commit:
        db.commit()
    
    pk = result.inserted_primary_key
        
    if pk and len(pk) > 0 and pk[0] is not None:
        return pk[0]
    err = "No se pudo obtener la llave primaria"
    log_error(err)
    raise ValueError(err)