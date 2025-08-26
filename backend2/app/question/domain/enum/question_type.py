from enum import Enum
class EQuestionType(Enum):
    TEXT = "TEXT" # input text
    NUMBER = "NUMBER" # input number
    TEXT_LONG = "TEXT_LONG" # textarea
    SINGLE_CHOICE = "SINGLE_CHOICE" # radio
    MULTIPLE_CHOICE = "MULTIPLE_CHOICE" # checkbox
    DATE = "DATE" # date
    TIME = "TIME" # time
    DATE_TIME = "DATE_TIME" # datetime


    #LIST = "LIST" # select