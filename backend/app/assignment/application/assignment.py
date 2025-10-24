from typing import List, Optional
from app.base.application.base import BaseLayerApplication
from app.assignment.domain.schemas.assignment import (
    ItemAssignment as I,
    DetailAssignment as E,
    NewAssignment as C,
    UpdateAssignment as U,
)
from app.assignment.domain.repository.assignment import IRepositoryAssignment
from app.base.domain.repository.session import TSession
from app.utils.log import log_info


class AssignmentApplication(BaseLayerApplication[C, I, E, U]):
    
    def __init__(self, repository: IRepositoryAssignment):
        super().__init__(repository)