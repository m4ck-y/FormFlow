-- ===================================================================
-- TABLA: form
-- Representa la plantilla inmutable de un cuestionario o formulario.
-- Define su estructura lógica, pero NO almacena respuestas ni instancias.
-- ===================================================================
CREATE TABLE form (
    id SERIAL PRIMARY KEY,
    key VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    scoring_expression JSONB,      -- Fórmula para calcular puntaje (ej. {"op": "sum", "fields": ["q1", "q2"]})
    evaluation_expression JSONB    -- Regla para clasificar resultado (ej. {"if": [{"gte": ["score", 70]}, "aprobado", "reprobado"]})
);

COMMENT ON TABLE form IS 'Plantilla inmutable de un formulario. Define preguntas (vía tabla question), y lógica de cálculo mediante expresiones en JSONB.';

COMMENT ON COLUMN form.key IS 'Identificador semántico y estable (ej. "onboarding_survey_v3"). Útil para referencias en código o integraciones. No cambia aunque se modifique el nombre.';

COMMENT ON COLUMN form.name IS 'Nombre legible del formulario para usuarios finales (ej. "Encuesta de Bienvenida").';

COMMENT ON COLUMN form.description IS 'Descripción explicativa del propósito del formulario.';

COMMENT ON COLUMN form.scoring_expression IS 'Expresión en JSONB que define cómo se calcula el puntaje numérico a partir de las respuestas. Ejemplo: {"operation": "weighted_sum", "weights": {"q1": 0.3, "q2": 0.7}}. Se evalúa al procesar una respuesta.';

COMMENT ON COLUMN form.evaluation_expression IS 'Expresión en JSONB que define cómo se interpreta el puntaje para generar una clasificación cualitativa. Ejemplo: {"if": [{"gte": ["score", 80]}, "excelente", {"gte": ["score", 60]}, "suficiente", "insuficiente"]}.';

-- ===================================================================
-- TABLA: question
-- Define cada pregunta dentro de un formulario.
-- Vinculada 1:N con form. Esencial para validar respuestas y renderizar el cuestionario.
-- ===================================================================
CREATE TABLE question (
    id SERIAL PRIMARY KEY,
    id_form INTEGER NOT NULL REFERENCES form(id) ON DELETE CASCADE,
    key VARCHAR(100) NOT NULL,
    text TEXT NOT NULL,
    question_type VARCHAR(50) NOT NULL,
    config JSONB,
    position INTEGER NOT NULL DEFAULT 0,
    UNIQUE (id_form, key)
);

COMMENT ON TABLE question IS 'Pregunta individual que forma parte de un formulario. Permite validar que las respuestas correspondan a preguntas reales y definir su comportamiento.';

COMMENT ON COLUMN question.key IS 'Identificador único dentro del formulario (ej. "satisfaction_rating"). Se usa en las expresiones de scoring/evaluación y en las respuestas.';

COMMENT ON COLUMN question.question_type IS 'Tipo de pregunta: "text", "number", "single_choice", "multiple_choice", "boolean", etc. Define cómo se interpreta el campo "value" en la respuesta.';

COMMENT ON COLUMN question.config IS 'Configuración específica por tipo. Ejemplos: {"options": ["Sí", "No"]}, {"min": 0, "max": 10}, {"required": true}.';

-- ===================================================================
-- TABLA: assignment
-- Representa la asignación lógica de un formulario a una persona o entidad.
-- NOTA: La persona asignada (id_person) NO tiene por qué ser quien responde.
-- Esto permite escenarios como:
--   • Un tutor responde por un estudiante.
--   • Un gerente asigna una autoevaluación a su equipo (pero cada uno responde por sí mismo).
--   • Un sistema asigna a un grupo, y luego un representante responde.
-- ===================================================================
CREATE TABLE assignment (
    id SERIAL PRIMARY KEY,
    id_form INTEGER NOT NULL REFERENCES form(id) ON DELETE CASCADE,
    id_person INTEGER NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE assignment IS 'Asignación lógica de un formulario a una persona o entidad (id_person). NO implica que esa persona responda directamente. Sirve para control de acceso, notificaciones y trazabilidad organizacional.';

COMMENT ON COLUMN assignment.id_person IS 'ID de la persona, estudiante, empleado o entidad a quien se le "asigna" el formulario. Puede ser distinto del usuario que responde (ver response.id_responder_user). Ej: un alumno (id_person=123) recibe una evaluación, pero su tutor (id_responder_user=456) la completa.';

COMMENT ON COLUMN assignment.status IS 'Estado de la asignación: "active", "cancelled", "completed", etc. Útil para gestionar flujos sin eliminar registros.';

-- ===================================================================
-- TABLA: scheduled
-- Define cuándo y por cuánto tiempo está disponible una asignación para ser respondida.
-- Cada programación permite uno o más intentos (response).
-- ===================================================================
CREATE TABLE scheduled (
    id SERIAL PRIMARY KEY,
    id_assignment INTEGER NOT NULL REFERENCES assignment(id) ON DELETE CASCADE,
    id_admin INTEGER NOT NULL,
    available_from TIMESTAMP NOT NULL,
    available_until TIMESTAMP NOT NULL,
    time_limit_minutes INTEGER,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CHECK (available_from <= available_until),
    CHECK (time_limit_minutes IS NULL OR time_limit_minutes > 0)
);

COMMENT ON TABLE scheduled IS 'Programación de la disponibilidad de una asignación. Define la ventana de tiempo en la que se puede iniciar una respuesta y el límite de duración por intento.';

COMMENT ON COLUMN scheduled.id_admin IS 'ID del administrador o sistema que programó esta disponibilidad. Útil para auditoría.';

COMMENT ON COLUMN scheduled.time_limit_minutes IS 'Tiempo máximo permitido desde que se inicia una respuesta (started_at) hasta que debe enviarse (submitted_at). Si es NULL, no hay límite.';

-- ===================================================================
-- TABLA: response
-- Representa un intento concreto de responder un formulario programado.
-- Aquí se almacenan los metadatos del intento y los resultados calculados.
-- ===================================================================
CREATE TABLE response (
    id SERIAL PRIMARY KEY,
    id_scheduled INTEGER NOT NULL REFERENCES scheduled(id) ON DELETE CASCADE,
    id_responder_user INTEGER NOT NULL,
    started_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    submitted_at TIMESTAMP,
    score NUMERIC,
    evaluation TEXT,
    CHECK (completed_at IS NULL OR started_at <= completed_at),
    CHECK (submitted_at IS NULL OR (completed_at IS NOT NULL AND completed_at <= submitted_at))
);

COMMENT ON TABLE response IS 'Intento individual de completar un formulario programado. Puede haber múltiples intentos por scheduled (ej. reintentos permitidos).';

COMMENT ON COLUMN response.id_responder_user IS 'ID del usuario que REALMENTE completó y envió el formulario. Puede ser distinto de assignment.id_person (ej. tutor, representante, delegado).';

COMMENT ON COLUMN response.started_at IS 'Momento en que el usuario abrió el formulario para responder.';

COMMENT ON COLUMN response.completed_at IS 'Momento en que el usuario marcó el formulario como "completo" (puede guardar progreso sin enviar).';

COMMENT ON COLUMN response.submitted_at IS 'Momento en que el usuario envió oficialmente el formulario. Solo entonces se considera válido para cálculo de resultados.';

COMMENT ON COLUMN response.score IS 'Puntaje numérico calculado tras procesar las respuestas usando form.scoring_expression. Se almacena para evitar recálculos y garantizar consistencia histórica.';

COMMENT ON COLUMN response.evaluation IS 'Clasificación cualitativa derivada del puntaje, usando form.evaluation_expression (ej. "aprobado", "nivel_básico").';

-- ===================================================================
-- TABLA: answer
-- Almacena la respuesta a una pregunta específica dentro de un intento (response).
-- El valor se guarda en JSONB para soportar múltiples tipos de datos.
-- ===================================================================
CREATE TABLE answer (
    id SERIAL PRIMARY KEY,
    id_response INTEGER NOT NULL REFERENCES response(id) ON DELETE CASCADE,
    id_question INTEGER NOT NULL REFERENCES question(id) ON DELETE CASCADE,
    value JSONB NOT NULL,
    CHECK (value ? 'type' AND value ? 'value')
);

COMMENT ON TABLE answer IS 'Respuesta individual a una pregunta en un intento específico. El valor se normaliza en JSONB para flexibilidad.';

COMMENT ON COLUMN answer.value IS 'Estructura normalizada: {"type": "string|number|boolean|array", "value": ...}. Ejemplos:
  - Texto: {"type": "text", "value": "Muy satisfecho"}
  - Número: {"type": "number", "value": 9.5}
  - Opción múltiple: {"type": "array", "value": ["opc1", "opc3"]}
  Esta estructura permite procesar respuestas de forma genérica y segura.';