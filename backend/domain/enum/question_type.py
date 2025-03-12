from enum import Enum
class EQuestionType(Enum):
    MULTIPLE_CHOICE = "MULTIPLE_CHOICE"
    CHECKBOX = "CHECKBOX"
    RADIO_BUTTON = "RADIO_BUTTON"
    TEXT = "TEXT"
    TEXT_AREA = "TEXT_AREA"
    DATE = "DATE"
    TIME = "TIME"