# 📘 Documentación completa de URLs (rutas) de Google Forms

---

## 🟢 1. API Oficial de Google Forms (REST)

La [**Google Forms API**](https://developers.google.com/forms/api/reference/rest?utm_source=chatgpt.com) permite a los desarrolladores crear, editar y leer formularios, así como consultar respuestas.

> Base URL:
> 

```
https://forms.googleapis.com
```

> Versión actual:
> 

```
/v1/
```

---

### 📥 Endpoints principales

| Método | Endpoint | Descripción |
| --- | --- | --- |
| `POST` | `/v1/forms` | Crea un nuevo formulario (vacío). |
| `GET` | `/v1/forms/{formId}` | Obtiene los metadatos y estructura del formulario. |
| `POST` | `/v1/forms/{formId}:batchUpdate` | Realiza múltiples operaciones sobre el formulario (agregar preguntas, secciones, cambiar tipos, etc.). |
| `GET` | `/v1/forms/{formId}/responses` | Lista las respuestas recibidas. |
| `GET` | `/v1/forms/{formId}/responses/{responseId}` | Obtiene una respuesta específica. |

---

### 🛠️ ¿Cómo se agregan preguntas, secciones o se cambian tipos?

Todo esto se hace a través de **`batchUpdate`**, enviando una lista de operaciones (como en Google Docs API).

### ➕ Agregar una pregunta

```json
{
  "requests": [
    {
      "createItem": {
        "item": {
          "title": "¿Cuál es tu nombre?",
          "questionItem": {
            "question": {
              "required": true,
              "textQuestion": {
                "paragraph": false}
            }
          }
        },
        "location": {
          "index": 0
        }
      }
    }
  ]
}
```

### ➕ Agregar una sección

```json
{
  "requests": [
    {
      "createItem": {
        "item": {
          "title": "Sección 1",
          "sectionItem": {}
        },
        "location": {
          "index": 1
        }
      }
    }
  ]
}
```

## JSON para agregar descripción y validación a una pregunta

Ejemplo para una pregunta de texto, con descripción y validación que obliga a que el texto sea un número entre 1 y 10:

```json
{
  "requests": [
    {
      "updateItem": {
        "item": {
          "itemId": "abc123",  // ID de la pregunta a modificar
          "title": "¿Cuántos años tienes?",
          "description": "Por favor ingresa un número entre 1 y 10.",
          "questionItem": {
            "question": {
              "required": true,
              "textQuestion": {
                "paragraph": false,
                "validation": {
                  "numericValidation": {
                    "condition": {
                      "type": "NUMBER_BETWEEN",
                      "lowerBound": {
                        "value": 1,
                        "type": "INCLUSIVE"
                      },
                      "upperBound": {
                        "value": 10,
                        "type": "INCLUSIVE"
                      }
                    },
                    "invalidMessage": "El número debe estar entre 1 y 10."
                  }
                }
              }
            }
          }
        },
        "updateMask": "title,description,questionItem.question.textQuestion.validation"
      }
    }
  ]
}

```

### 🔄 Cambiar tipo de pregunta

Ejemplo: cambiar a una pregunta de selección múltiple

```json
{
  "requests": [
    {
      "updateItem": {
        "item": {
          "itemId": "abc123",
          "title": "¿Qué color prefieres?",
          "questionItem": {
            "question": {
              "choiceQuestion": {
                "type": "RADIO",
                "options": [
                  {"value": "Rojo"},
                  {"value": "Verde"},
                  {"value": "Azul"}
                ],
                "shuffle": false}
            }
          }
        },
        "updateMask": "title,questionItem.question.choiceQuestion"
      }
    }
  ]
}
```

> Puedes combinar muchas operaciones en un solo batchUpdate.
> 

---

## 🔔 Endpoint de `batchUpdate`

**Ruta**:

```
POST /v1/forms/{formId}:batchUpdate
```

Este endpoint permite aplicar múltiples operaciones en una sola solicitud:

### 📌 Tipos de operaciones que puedes enviar en `requests`:

| Operación | Descripción |
| --- | --- |
| `createItem` | Agrega una pregunta, sección u otro ítem. |
| `updateItem` | Modifica una pregunta o sección existente. |
| `deleteItem` | Elimina un ítem del formulario. |
| `moveItem` | Cambia la posición de un ítem. |
| `updateSettings` | Cambia configuraciones del formulario (quién puede responder, etc.). |
| `updateFormInfo` | Cambia el título o descripción del formulario. |

🔗 Referencia completa de `batchUpdate`

---

## 🟡 2. URLs de la interfaz web de Google Forms

Estas rutas se usan en el **frontend de Google Forms** (cuando accedes desde navegador).

> Base URL:
> 

```
https://docs.google.com/forms

```

### 📄 Rutas principales

| Acción | Ruta | Descripción |
| --- | --- | --- |
| Ver formulario | `/d/e/{formId}/viewform` | Muestra el formulario al usuario final. |
| Enviar respuesta | `/d/e/{formId}/formResponse` | Endpoint para enviar respuestas (no oficial, vía POST). |
| Prellenar campos | `/d/e/{formId}/viewform?entry.123=valor` | Llenar campos automáticamente usando parámetros. |

> ⚠️ Estas rutas no están documentadas oficialmente por Google y pueden dejar de funcionar sin previo aviso. No tienen soporte técnico.
> 

---

### 📥 Envío de respuestas (no oficial)

**POST** a:

```
https://docs.google.com/forms/d/e/{formId}/formResponse
```

**Payload (x-www-form-urlencoded)**:

```
entry.123456=Pedro&entry.789012=perez@example.com&submit=Submit
```

---

## 🔍 3. Discovery Endpoint (para generar clientes)

Google expone un descriptor para herramientas de cliente:

```
https://forms.googleapis.com/$discovery/rest?version=v1
```

Devuelve un JSON con la descripción de todos los endpoints y esquemas.

---

## 📚 Recursos oficiales

- 🌐 Documentación de la API de Google Forms
- 📖 [Referencia REST completa](https://developers.google.com/forms/api/reference/rest?utm_source=chatgpt.com)
- 🧪 Try it in the API Explorer

---

## 🧰 ¿Qué rutas usar en tu sistema propio?

Si vas a construir tu propio sistema tipo Google Forms, podrías inspirarte en estas rutas:

### 📁 Formularios

| Método | Ruta | Acción |
| --- | --- | --- |
| `GET` | `/api/forms` | Listar formularios |
| `POST` | `/api/forms` | Crear nuevo formulario |
| `GET` | `/api/forms/{formId}` | Obtener detalles |
| `PATCH` | `/api/forms/{formId}` | Editar metadatos |

### 📋 Preguntas y secciones

| Método | Ruta | Acción |
| --- | --- | --- |
| `POST` | `/api/forms/{formId}/items` | Agregar pregunta o sección |
| `PATCH` | `/api/forms/{formId}/items/{itemId}` | Modificar pregunta o sección |
| `DELETE` | `/api/forms/{formId}/items/{itemId}` | Eliminar ítem |

### 📨 Respuestas

| Método | Ruta | Acción |
| --- | --- | --- |
| `GET` | `/api/forms/{formId}/responses` | Ver respuestas |
| `POST` | `/api/forms/{formId}/responses` | Enviar nueva respuesta |