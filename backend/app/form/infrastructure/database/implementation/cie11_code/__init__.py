from app.form.infrastructure.database.model.cie11_code import ModelCIE11Code as Table
from app.base.infrastructure.database.implementation import BaseRepository
from app.form.domain.schemas.cie11_code import (
    SResponse as E,
    SRequestCie11Code as C,
    SUpdateCie11Code as U
)

class Cie11CodeRepository(BaseRepository[Table, C, E, E, U]):
    def __init__(self):
        super().__init__(Table, C, E, E, U)