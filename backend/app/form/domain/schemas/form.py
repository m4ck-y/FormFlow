from app.base.domain.schemas.base import BaseORMModel
from app.base.domain.schemas.create_api import BaseCreateAPISchema
from app.form.domain.schemas.age_group import SchemaDetailAgeGroup
from app.form.domain.schemas.category import (
    SchemaDetailCategory,
    SchemaCreateAPICategory,
)
from app.form.domain.schemas.estimated_duration import (
    SchemaDetailEstimatedDuration,
    SchemaCreateItemAPIEstimatedDuration,
)
from app.form.domain.schemas.reference import (
    SchemaDetailReference,
    SchemaCreateItemAPIReference,
)
from app.form.domain.schemas.target_sex import SchemaDetailTargetSex

from app.question.domain.schemas.question import (
    SchemaCreateAPIQuestion,
    SchemaDetailQuestion,
)
from app.section.domain.schemas.section import (
    SchemaDetailSection,
    SchemaCreateAPISection,
)
from typing import List, Text, Optional
from pydantic import Field, model_validator
from app.form.domain.schemas.cie11_code import SRequestCie11Code, SResponseCIE11Code
from app.form.domain.schemas.evaluation_topic import (
    SchemaDetailEvaluationTopic,
    SchemaCreateAPIEvaluationTopic,
)


class SchemaBaseForm(BaseORMModel):
    key: Optional[str] = Field(
        None,
        description="Código único del formulario",
        examples=["ENCUESTA123", "FOLIO12345"],
    )  # FOLIO
    name: str = Field(..., examples=["Encuesta de Satisfacción"])
    description: Text = Field(
        ..., examples=["Formulario para evaluar el servicio ofrecido"]
    )


class SchemaCreateDB(SchemaBaseForm):
    pass


class SchemaCreateAPIForm(BaseCreateAPISchema, SchemaBaseForm):
    """
    Representa un formulario que puede contener una lista de secciones o
    una lista de preguntas, pero no ambas a la vez. A través de este esquema,
    definimos la estructura para crear un formulario.
    """

    list_questions: Optional[List[SchemaCreateAPIQuestion]]
    list_sections: Optional[List[SchemaCreateAPISection]]

    list_categories: List[SchemaCreateAPICategory | int] = Field(
        ...,
        description="Lista de categorías asociadas al formulario. Cada categoría puede ser representada por su ID (entero) o por un objeto completo de categoría.",
        examples=[
            [1, {"key_industry": 1, "name": "Salud"}]
        ],
    )

    list_cie11_codes: List[SRequestCie11Code | int] = Field(
        ...,
        description="Lista de códigos CIE-11 asociados al formulario. Cada código CIE-11 puede ser representado por su ID (entero) o por un objeto completo de código CIE-11.",
        examples=[
            [1, {"code": "1A00", "description": "Cólera"}]
        ],
    )

    list_evaluation_topics: List[SchemaCreateAPIEvaluationTopic | int] = Field(
        ...,
        description="Lista de temas de evaluación asociados al formulario. Cada tema puede ser representado por su ID (entero) o por un objeto completo de tema de evaluación.",
        examples=[
            [1, {"name": "Salud Mental", "description": "Evaluación de aspectos psicológicos", "key_industry": "health"}]
        ],
    )

    list_references: List[SchemaCreateItemAPIReference] = Field(
        default=[],
        description="Lista de referencias bibliográficas específicas de este formulario.",
        examples=[[{
            "url_reference": "https://pubmed.ncbi.nlm.nih.gov/11485122/",
            "name": "Validation of a Brief Depression Severity Measure",
            "notes": "Artículo que valida el PHQ-9",
            "url_thumbnail": "",
            "type": "LINK"
        }]]
    )

    estimated_duration: Optional[SchemaCreateItemAPIEstimatedDuration] = Field(
        None,
        description="Duración estimada para completar el formulario.",
        examples=[{
            "min_minutes": 5,
            "max_minutes": 10,
            "description": "Duración estimada para completar el cuestionario"
        }]
    )

    def to_db_schema(self) -> SchemaCreateDB:
        return SchemaCreateDB(
            key=self.key, name=self.name, description=self.description
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
            raise ValueError(
                "Solo puedes proporcionar una de las listas: 'list_sections' o 'list_questions', no ambas."
            )

        # Verificar que al menos una lista esté presente
        if not sections and not questions:
            raise ValueError(
                "Debes proporcionar al menos una de las listas: 'list_sections' o 'list_questions'."
            )

        return values  # Devuelve los valores validados (sin cambios si son válidos)


class SchemaItemForm(SchemaBaseForm):
    id: int


class SchemaDetailForm(SchemaItemForm):
    list_questions: List[SchemaDetailQuestion]  # Preguntas del formulario
    list_sections: List[SchemaDetailSection]

    list_references: List[SchemaDetailReference]
    list_categories: List[SchemaDetailCategory]
    list_cie11_codes: List[SResponseCIE11Code]
    list_evaluation_topics: List[SchemaDetailEvaluationTopic]

    estimated_duration: Optional[SchemaDetailEstimatedDuration]
    target_age_group: Optional[SchemaDetailAgeGroup]
    target_sex: Optional[SchemaDetailTargetSex]


class SchemaUpdateForm(SchemaBaseForm):
    id: int
