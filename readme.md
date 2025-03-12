# FormFlow

## Introducción
FormFlow es una aplicación diseñada para gestionar formularios dinámicos, permitiendo que las preguntas y respuestas se adapten de manera fluida en función de las interacciones del usuario.

## Significado del Nombre
- **Form**: Se refiere directamente a los formularios, el componente central de la aplicación.
- **Flow**: Implica fluidez, dinamismo y flexibilidad, reflejando la capacidad del sistema de adaptarse y evolucionar según las respuestas de los usuarios.


## Problema
Crear una aplicación que permita gestionar formularios dinámicos con características adicionales como:
1. **Condicionalidad**: Preguntas que dependen de respuestas anteriores.
2. **Valoración y Ponderación de Respuestas**: Asignar valores numéricos a las respuestas.
3. **Redirección Dinámica y Soporte para Imágenes**: Redirigir a distintas URLs o incluir imágenes como opciones.
4. **Escalabilidad y Flexibilidad**: Manejar formularios de tamaño variable con lógica condicional compleja.
5. **Interacción con el Frontend**: Eficiente interacción con el frontend para mostrar preguntas en el orden correcto.

## Propuesta de Solución
Crear una estructura de base de datos robusta que permita manejar URLs de redirección e imágenes de opciones, incluyendo un campo `url_type` para diferenciarlas.

### Estructura JSON
```json
{
  "formId": 1,
  "formName": "Encuesta de Satisfacción",
  "categoryId": 101,
  "questions": [
    {
      "questionId": 1,
      "questionType": "multiple_choice",
      "questionText": "¿Cómo calificarías nuestro servicio?",
      "answers": [
        {
          "answerId": 1,
          "answerText": "Excelente",
          "answerValue": 5,
          "redirectUrl": "/feedback/excelente",
          "urlType": "link"
        },
        {
          "answerId": 2,
          "answerText": "Bueno",
          "answerValue": 4,
          "imageUrl": "https://example.com/images/bueno.jpg",
          "urlType": "image"
        },
        {
          "answerId": 3,
          "answerText": "Regular",
          "answerValue": 3,
          "imageUrl": "https://example.com/images/regular.jpg",
          "urlType": "image"
        }
      ],
      "conditionalLogic": null
    },
    {
      "questionId": 2,
      "questionType": "text",
      "questionText": "¿Qué mejorarías?",
      "answers": [],
      "conditionalLogic": {
        "triggeredByQuestionId": 1,
        "expectedAnswerIds": [1, 2],
        "comparisonOperator": ">=",
        "description": "Habilitar esta pregunta si la respuesta a la Pregunta 1 es 'Excelente' o 'Bueno'"
      }
    }
  ]
}
```

### Propiedades Clave
- formId: Identificador único del formulario.
- formName: Nombre del formulario.
- categoryId: Identificador único para la categoría del formulario.
- questions: Lista de preguntas que forman parte del formulario.

### Propiedades de Preguntas
- questionId: Identificador único de la pregunta.
- questionType: Tipo de pregunta (multiple_choice, checkbox, radio_button, text).
- questionText: Texto que describe la pregunta.
- answers: Lista de respuestas posibles para la pregunta.
- conditionalLogic: Define la lógica condicional para mostrar la pregunta.

### Propiedades de Respuestas
- answerId: Identificador único de la respuesta.
- answerText: Texto que representa la respuesta.
- answerValue: Valor asociado a la respuesta.
- redirectUrl: URL de redirección (opcional).
- imageUrl: URL de una imagen asociada a la respuesta (opcional).
- urlType: Tipo de URL (link o image).