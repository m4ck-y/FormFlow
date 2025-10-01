from enum import Enum

class EConditionalOperator(str, Enum):
    """Operadores disponibles para reglas condicionales"""
    EQUAL = "=="
    NOT_EQUAL = "!="
    GREATER_THAN = ">"
    LESS_THAN = "<"
    GREATER_EQUAL = ">="
    LESS_EQUAL = "<="

class EConditionalType(str, Enum):
    """Tipos de evaluación lógica para condicionales"""
    ALL = "all"    # Todas las reglas deben cumplirse (AND)
    ANY = "any"    # Al menos una regla debe cumplirse (OR)
    NONE = "none"  # Ninguna regla debe cumplirse (NOT)