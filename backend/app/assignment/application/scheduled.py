from typing import List, Optional
from app.base.application.base import BaseLayerApplication
from app.assignment.domain.schemas.scheduled import (
    ItemScheduled as I,
    DetailScheduled as E,
    NewScheduled as C,
    UpdateScheduled as U,
)
from app.assignment.domain.repository.scheduled import IRepositoryScheduled
from app.base.domain.repository.session import TSession
from app.utils.log import log_info


class ScheduledApplication(BaseLayerApplication[C, I, E, U]):
    
    def __init__(self, repository: IRepositoryScheduled):
        super().__init__(repository)