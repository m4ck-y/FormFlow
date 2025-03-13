from pydantic import BaseModel, Field
from domain.enum.comparison_operator import EComparisonOperator
from typing import Optional


class SchemaConditionalLogicCreate(BaseModel):
    triggered_by_question_id: Optional[int] = Field(
        None,
        examples=[1],
        description="ID de la pregunta que activa esta lógica condicional. Si no se proporciona, la lógica no estará vinculada a ninguna pregunta específica.")
    formula: str = Field(
        ...,
        examples=["A1 || A2", "Q1 == 1 && Q2 == 2"],
        description="Fórmula condicional que se evaluará para activar o desactivar la pregunta. Utiliza la notación 'Q{id_question}', 'A{id_answer}' o 'F{id_form}' para referirte a preguntas, respuestas o formularios.") #Q{id_question}, A{id_answer}, F{id_form}
    description: str = Field(
        ...,
        examples=[
            "Habilitar esta pregunta si la respuesta a la Pregunta 1 es 'Excelente' o 'Bueno'",
            "Habilitar esta pregunta si el valor total de la Pregunta 1 es mayor o igual a 20"
            ],
        description="Descripción de la lógica condicional, explicando qué hace esta fórmula condicional y bajo qué circunstancias se debe activar o desactivar.")


class SchemaConditionalLogic(BaseModel):
    id: int