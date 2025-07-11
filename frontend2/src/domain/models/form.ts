import type { IBase } from "./form/base";
import type { IDetailQuestion } from "./question";




export interface Section {
  name: string;
  description: string;
  order: number;
  id: number;
  list_questions: IDetailQuestion[];
}


export interface ICreateAPIForm extends IBase{
  list_sections: Section[] | null;
  list_questions: IDetailQuestion[] | null;
}

export interface IItemForm extends IBase {
  id: number;
}

export interface IDetailForm extends IItemForm {
  /* key: string;
  name: string;
  description: string; */

  list_questions: IDetailQuestion[];
  list_sections: Section[];
  list_what_it_evaluate: any[]; // Cambia `any` por un tipo específico si conoces su estructura
  list_references: any[];
  list_categories: any[];
  estimated_duration: number | null;
  target_age_group: string | null; // Cambia a un tipo específico si hay valores definidos
  target_sex: string | null; // Igual que arriba
}