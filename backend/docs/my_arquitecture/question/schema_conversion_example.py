# Ejemplo de uso de la nueva arquitectura de schemas

from app.question.domain.schemas.question import SchemaCreateAPIQuestion, SchemaCreateDBQuestion

def create_question_service(api_data: SchemaCreateAPIQuestion):
    """
    Ejemplo de cómo se usaría en la capa de infraestructura.
    
    El frontend envía SchemaCreateAPIQuestion con condition como objeto Conditional.
    En alguna capa de infraestructura, se hace la conversión automática.
    """
    
    # 1. Recibimos datos del frontend (API schema)
    print("📥 Datos del frontend:")
    print(f"   Type: {api_data.type}")
    print(f"   Text: {api_data.text}")
    print(f"   Condition: {api_data.condition}")
    print(f"   Condition type: {type(api_data.condition)}")
    
    # 2. Convertimos a schema de BD (automático según motor)
    question_db_schema = api_data.to_db_schema()
    
    print("\n🔄 Después de conversión a DB schema:")
    print(f"   Condition: {question_db_schema.condition}")
    print(f"   Condition type: {type(question_db_schema.condition)}")
    
    # 3. Aquí ya podríamos insertar en BD
    # repository.create(question_db_schema)
    
    return question_db_schema

# Ejemplo de uso alternativo directo
def create_question_alternative(api_data: SchemaCreateAPIQuestion):
    """
    Alternativa: conversión directa sin método helper
    """
    question_db_schema = SchemaCreateDBQuestion(**api_data.model_dump())
    # La conversión se hace automáticamente en el validator
    
    return question_db_schema

# Ejemplo con datos reales
if __name__ == "__main__":
    from app.question.domain.schemas.conditional import Conditional, ConditionalRule
    from app.question.domain.enum.conditional import EConditionalOperator, EConditionalType
    from app.question.domain.enum.question_type import EQuestionType
    
    # Simular datos del frontend
    api_question = SchemaCreateAPIQuestion(
        type=EQuestionType.SINGLE_CHOICE,
        text="¿Cómo se siente hoy?",
        order=1,
        condition=Conditional(
            type=EConditionalType.SIMPLE,
            rules=[
                ConditionalRule(
                    question_id=1,
                    operator=EConditionalOperator.EQUALS,
                    value="deprimido"
                )
            ]
        ),
        list_options=[]
    )
    
    # Convertir para BD
    db_question = create_question_service(api_question)
    
    print(f"\n✅ Conversión completada!")
    print(f"   API condition type: {type(api_question.condition)}")
    print(f"   DB condition type: {type(db_question.condition)}")