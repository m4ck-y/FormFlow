import json
from app.base.infrastructure.database.model_type import TModelType
from app.utils.enum.str_color import StrColor


str_color = StrColor()

def str_record_model_json(record_model: TModelType) -> str:
    return str_color\
        .MAGENTA(record_model.__name__)\
        .YELLOW(
            json.dumps(
                record_model.__dict__,
                default=str,
                indent=4
            )
        )