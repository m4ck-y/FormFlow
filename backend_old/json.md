

```json
{
    "key": "ENCUESTA123",
    "name": "Encuesta de Satisfacción",
    "description": "Formulario para evaluar el servicio ofrecido",
    "list_questions": [
        {
            "type": "MULTIPLE_CHOICE",
            "text": "¿Cómo calificarías nuestro servicio?",
            "list_answers": [
                {
                    "text": "Excelente",
                    "value": 5,
                    "url": "http://wwww.pinterest.com/image.png",
                    "url_type": "LINK"
                }
            ],
            "conditional_logic": {
                "triggered_by_question_id": 1,
                "formula": "A1 || A2",
                "description": "Habilitar esta pregunta si la respuesta a la Pregunta 1 es 'Excelente' o 'Bueno'"
            }
        }
    ]
}
```