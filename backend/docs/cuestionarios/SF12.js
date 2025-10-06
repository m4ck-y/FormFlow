sf12 = [{ id: 1, label: "1", value: 0 }];

puntuacion = "avg(answers.values)";

interpretacion =
  "switch((puntuacion < 50, 'Baja Calidad de vida'), 'Alta calidad de vida')";
