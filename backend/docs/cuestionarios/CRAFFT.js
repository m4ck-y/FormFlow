craft_parte_a = [
  { id: 1, options: [1, 2] },
  { id: 2, options: [1, 2] },
  { id: 3, options: [1, 2] },
];
condicion = `Si responde "no" a las preguntas de la parte "a":
  sólo realizar la primer pregunta de la parte "b".
  Cada "si" es un punto.`;
craft_parte_b = [
  {
    id: 4,
  },
  {
    id: 5,
    conditional:
      "any([ (anwers.id_question == 1 AND anwers.value ==1) ,(anwers.id_question == 2 AND anwers.value ==1), (anwers.id_question == 3 AND anwers.value ==1)])",
  },
  {
    id: 6,
    conditional: `any(
    [
      (question.id == 1 AND question.value == 1),
      (question.id == 2 AND question.value == 1),
      (question.id == 3 AND question.value == 1)
    ])`,
  },
  {
    id: 7,
    conditional: "any([q1==1,q2==1, q3==1])",
  },
  {
    id: 8,
    conditional: "any([q1==1,q2==1, q3==1])",
  },
  {
    id: 9,
    conditional: "any([q1==1,q2==1, q3==1])",
  },
];

puntuacion = "sum(anwers.values)";

interpretation = "swith((puntuacion < 2, 'No consumo'), 'Necesita evaluacion')";
