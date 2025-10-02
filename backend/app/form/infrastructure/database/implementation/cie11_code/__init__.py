from app.form.infrastructure.database.implementation.cie11_code.create_with_form import CreateCIE11CodeWithForm
from app.form.infrastructure.database.model.cie11_code import ModelCIE11Code as Table
from app.base.infrastructure.database.implementation import BaseRepository
from app.form.domain.schemas.cie11_code import (
    SResponseCIE11Code as E,
    SRequestCie11Code as C,
    SUpdateCie11Code as U
)
from app.form.domain.schemas.form_cie11_codes import SInsertFormCie11Codes
from app.base.domain.repository.session import TSession

class Cie11CodeRepository(BaseRepository[Table, C, E, E, U]):
    def __init__(self):
        super().__init__(Table, C, E, E, U)

    def CreateWithForm(self, db:TSession, value:SInsertFormCie11Codes, auto_commit = False) -> int:
        return CreateCIE11CodeWithForm(db, value, auto_commit=auto_commit)