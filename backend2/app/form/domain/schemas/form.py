from app.base.domain.schemas.base import BaseORMModel
from app.base.domain.schemas.create_api import BaseCreateAPISchema
from app.question.domain.schemas.question import SchemaCreateAPIQuestion
from app.section.domain.schemas.section import SchemaDetailSection, SchemaCreateAPISection
from typing import List, Text, Optional
from pydantic import Field, model_validator

class SchemaBaseForm(BaseORMModel):
    key: Optional[str] = Field(None, examples=["ENCUESTA123", "FOLIO12345"]) #FOLIO
    name: str = Field(..., examples=["Encuesta de Satisfacción"])
    description: Text = Field(..., examples=["Formulario para evaluar el servicio ofrecido"])


class SchemaCreateDB(SchemaBaseForm):
    pass

class SchemaCreateAPIForm(BaseCreateAPISchema, SchemaBaseForm):
    """
    Representa un formulario que puede contener una lista de secciones o
    una lista de preguntas, pero no ambas a la vez. A través de este esquema,
    definimos la estructura para crear un formulario.
    """
    list_sections: Optional[List[SchemaCreateAPISection]]
    list_questions: Optional[List[SchemaCreateAPIQuestion]]

    def to_db_schema(self) -> SchemaCreateDB:
        return SchemaCreateDB(
            key=self.key,
            name=self.name,
            description=self.description
        )

    @model_validator(mode="before")
    def check_only_one_of_lists(cls, values):
        """
        Valida que el formulario contenga **solo una de las dos listas**:
        `list_sections` o `list_questions`. No se puede proporcionar ambas listas
        al mismo tiempo.
        
        - Si ambas listas están presentes, levantará un error.
        - Si ninguna lista está presente, levantará un error.
        
        Args:
            cls: La clase a la que pertenece el validador.
            values: Los valores actuales de los campos del formulario (listas `list_sections` y `list_questions`).

        Raises:
            ValueError: Si ambas listas están presentes o si ninguna lista está presente.

        Returns:
            values: Los valores validados.
        """
        sections = values.get("list_sections")  # Lista de secciones del formulario
        questions = values.get("list_questions")  # Lista de preguntas del formulario

        # Verificar que no ambas listas estén presentes al mismo tiempo
        if sections and questions:
            raise ValueError("Solo puedes proporcionar una de las listas: 'list_sections' o 'list_questions', no ambas.")
        
        # Verificar que al menos una lista esté presente
        if not sections and not questions:
            raise ValueError("Debes proporcionar al menos una de las listas: 'list_sections' o 'list_questions'.")
        
        return values  # Devuelve los valores validados (sin cambios si son válidos)

class SchemaItemForm(SchemaBaseForm):
    id: int

class SchemaDetailForm(SchemaItemForm):
    list_sections: List[SchemaDetailSection]

class SchemaUpdateForm(SchemaBaseForm):
    id: int
