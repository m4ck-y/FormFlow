import { NewSource } from "@/domain/entity/NewSource";

export type NewsAuthor = {
    id: string;
  name: string;
  profileUrl?: string;
};


export interface NewPostApi {
    id: string;
    titulo: string;
    autor: string;
    fecha: string; // ISO 8601
    contenido: string;
    imagenPrincipal: string;
    link: string;
}

export interface NewPost {
  id: string;
  tittle: string;
  person_author: NewsAuthor | null;
  link: string;
  mainImageUrl: string;
  date: string; // ISO 8601
  content_file_name: string;
  source: NewSource;
}
