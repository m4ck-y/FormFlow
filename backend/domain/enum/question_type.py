from enum import Enum
class EQuestionType(Enum):
    TEXT = "TEXT" # input text
    TEXT_LONG = "TEXT_LONG" # textarea
    SINGLE_CHOICE = "SINGLE_CHOICE" # radio
    MULTIPLE_CHOICE = "MULTIPLE_CHOICE" # checkbox
    LIST = "LIST" # select
    DATE = "DATE" # date
    TIME = "TIME" # time
    DATE_TIME = "DATE_TIME" # datetime