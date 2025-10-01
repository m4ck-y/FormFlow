{
  "key": "PHQ-9",
  "name": "PHQ-9 (Patient Health Questionnaire)",
  "description": "El PHQ-9 es una herramienta breve y confidencial que te ayuda a reflexionar sobre cómo te has estado sintiendo en las últimas dos semanas. Sus preguntas se enfocan en aspectos comunes del estado de ánimo, como la energía, el sueño o el apetito. No se trata de un diagnóstico, sino de un primer paso para entender mejor tu bienestar emocional. Muchas personas lo usan para saber si sería útil hablar con un profesional de salud mental. Responde con tranquilidad y honestidad: no hay respuestas correctas o incorrectas, solo lo que tú has vivido últimamente.",
  "id": 1,

  "list_categories": [
    {
      "key_industry": 1,
      "name": "Bienestar Mental",
      "id": 5
    }
  ],
  "list_cie11_codes": [
    {
      "code": "6A7",
      "id_form": 1,
      "id": 1
    }
  ],

  "list_questions": [], # TODO "conditional"

  # TODO

  formula por pregunta, ej imc
  formula para form{
     calcular el valor final del form, ejemplo summando todos los valores de cada pregunta
     el valor final del form puede ser tipo entero o string por eso es mejor dejarlo como bjson

     no se como representar la puntuacion
     
     formula:"JSON ej: sum(entity:"question"."value"."all")"
     puntuacion o value, o resultado o evaluacio o calificacion:
     [{
        "text": "sin dificultad",
        "value": 0
     },
     {
        "text": "un poco de dificultad",
        "value": 1
     },
     {
        "text": "muy difícil",
        "value": 2
     },
     }],


     esque despues hay otros

     por ejem

     RESULTADOS de pHQ9

     puntuacion, interpretacion
     1-4 puntos, depresion minima
  }


  "list_what_it_evaluate": [],
  "list_references": [],
  "estimated_duration": null,
  "target_age_group": null,
  "target_sex": null,
  "list_sections": []
}




# NOMENCLATURAS
ejemplo
relacion n:n

n forms - n cie11_codes

## tables
form, cie11_code

## table auxiliar

identificar tabla primaria: form

{nombre_tabla_primaria}_{nombre_tabla_secundaria_sin_separacion}

form_cie11codes

## relacion final
tablas finales
form(id, name, etc)
cie11_code(id, code, etc)
form_cie11codes(id_form, id_cie11_code)

# fastapi:
## schemas pydantic

schema_cie11code{
  id, code
}


schema_form{
  id, name
  list_cie11codes {aqui se omite el nombre de la tabla primaria porque ya estaria implicito en el schema padre en pydantic}
}

## endpoint
cuando se haga GET form/{id_form}, retorne:
form:{
  id, name
  list_cie11codes {aqui se omite el nombre de la tabla primaria porque ya estaria implicito en el schema padre en pydantic}
}

sqlalchemy with tables update fields, updated at, by, etc like basemodel

herencia?: Table, 

#TODO: table, updatated_by, deleted_by, etc, se puede hacer una clase que herede de table? y tendria atributos creted_at, by?, etc, ...