import { NewSource } from "@/domain/entity/NewSource";
import { ENewsSource } from "@/domain/enum/news/source";

export const NEWS_SOURCES: Record<ENewsSource, NewSource> = {
  [ENewsSource.MEXICO_AEROSPACE]: {
    id: ENewsSource.MEXICO_AEROSPACE,
    name: "Mexico Aeroespacial",
    logoUrl: "https://mexicoaeroespacial.mx/wp-content/uploads/2021/03/cropped-Logo-Mexico-Aeroespacial.png",
    link: "https://mexicoaeroespacial.mx/",
  },
  [ENewsSource.MILENIO]: {
    id: ENewsSource.MILENIO,
    name: "Milenio",
    logoUrl: "https://www.milenio.com/bundles/appcamusassets/dist/images/icons/180x180.png",
    link: "https://www.milenio.com/",
  },
  [ENewsSource.SECRETARIA_SALUD_MX]: {
    id: ENewsSource.SECRETARIA_SALUD_MX,
    name: "Secretaria de Salud",
    logoUrl: "https://www.gob.mx/ssalud/acciones-y-programas/_jcr_content/par/image/image.img.png/1670526481532.png",
    link: "https://www.gob.mx/ssalud/",
  },
};