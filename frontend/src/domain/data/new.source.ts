import { NewSource } from "@/domain/entity/NewSource";
import { ENewsSource } from "@/domain/enum/news/source";

export const NEWS_SOURCES: Record<ENewsSource, NewSource> = {
  [ENewsSource.MEXICO_AEROSPACE]: {
    id: ENewsSource.MEXICO_AEROSPACE,
    name: "Mexico Aeroespacial",
    logoUrl: "https://scontent.fmex27-1.fna.fbcdn.net/v/t39.30808-1/449156869_862809449217692_8164237232418266018_n.jpg?stp=c101.130.882.883a_dst-jpg_s200x200_tt6&_nc_cat=111&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=EHJShNWgxs0Q7kNvwHCYHoR&_nc_oc=AdnGW8YdMhsbP2mHWkTmGJuBAkXxc6BjEWAS3o4Ek8tftaBqzVTTEyQA0lBrduJVpMM&_nc_zt=24&_nc_ht=scontent.fmex27-1.fna&_nc_gid=9UU39vpSX4jBAuAffvbOvw&oh=00_AfEVq35x50uE7duFq7mZ29Hr2t6uu97hOQoPa4C4h7_8Ow&oe=681573D0",
    link: "https://mexicoaeroespacial.mx/",
    has_author: true,
  },
  [ENewsSource.INSP]: {
    id: ENewsSource.INSP,
    name: "Instituto Nacional de Salud Pública",
    logoUrl: "https://insp.mx/assets/images/insp_logo.png",
    link: "https://www.insp.mx/",
    has_author: true,
  },
  [ENewsSource.MILENIO]: {
    id: ENewsSource.MILENIO,
    name: "Milenio",
    logoUrl: "https://www.milenio.com/bundles/appcamusassets/dist/images/icons/180x180.png",
    link: "https://www.milenio.com/",
    has_author: true,
  },
  [ENewsSource.SECRETARIA_SALUD_MX]: {
    id: ENewsSource.SECRETARIA_SALUD_MX,
    name: "Secretaria de Salud",
    logoUrl: "https://scontent.fmex26-1.fna.fbcdn.net/v/t39.30808-1/465990584_890267459952930_1382177551566609811_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=1&ccb=1-7&_nc_sid=2d3e12&_nc_ohc=WClpKyK7zVMQ7kNvwHPutgA&_nc_oc=AdmGzTdX4SB6QRjuStXB5f-9KyuXwH3mXAVp7dxn8VFbDo1fhQgK6nLZgWZckydDifA&_nc_zt=24&_nc_ht=scontent.fmex26-1.fna&_nc_gid=sa1kHGBSsm-jxL9VeyAu3A&oh=00_AfGjeUtqCIjA9srAe0bIvL1To2NqhXZgKeq6bSB5rw8bPg&oe=6815ADAA",
    link: "https://www.gob.mx/ssalud/",
    has_author: false,
  },
  [ENewsSource.OPS]: {
    id: ENewsSource.OPS,
    name: "Organización Panamericana de la Salud",
    logoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ16N2aVTuSq2N-wsNirjwXSlKmpRBOJ6N8g&s",
    link: "https://www.paho.org/es",
    has_author: false,
  },
};