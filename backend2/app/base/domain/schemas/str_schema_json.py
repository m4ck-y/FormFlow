import json
from app.base.domain.schemas.base import BaseORMModel
from app.utils.enum.str_color import StrColor


str_color = StrColor()

def str_schema_json(record_model: BaseORMModel) -> str:
    return str_color\
        .YELLOW(record_model.__repr_name__())\
        .BLUE(
            json.dumps(
                record_model.model_dump(),
                default=str,
                indent=4
            )
        )