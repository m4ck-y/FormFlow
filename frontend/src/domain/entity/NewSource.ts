import { ENewsSource } from "@/domain/enum/news/source";

export type NewSource = {
  id : ENewsSource;
  name: string;
  logoUrl: string;
  link: string;
  has_author: boolean;
}