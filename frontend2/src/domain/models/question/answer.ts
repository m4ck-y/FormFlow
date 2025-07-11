import type { ICreateAPIURL, IDetailURL } from "./url";

export interface IBaseAnswer {
    text: string;
    value: string;
}

export interface ICreateAPIAnswer extends IBaseAnswer {
    id_question: number;
    url: ICreateAPIURL | null;
}

export interface IItemAnswer  extends IBaseAnswer {
    id: number;
    url: ICreateAPIURL | null;
}

export interface IDetailAnswer {
  // Puedes agregar propiedades si las respuestas no están vacías
  text: string;
  value: string;
  id: number;

  url: IDetailURL | null; // Cambia `null` por un tipo específico si es necesario
}