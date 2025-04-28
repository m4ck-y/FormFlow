import { ESource_to_NewSource, format_date } from "@/domain/dto/news/new";
import { NewPost } from "@/domain/entity/NewPost";
import { ENewsSource } from "@/domain/enum/news/source";

// Ejemplo mock para testeo
const mockNews: NewPost[] = [
  // Ejemplo de noticia
  {
    id: "news-0",
    tittle: "El satélite mexicano NanoConnect-2, esta en orbita",
    person_author: { id: "a0", name: "Jose Quevedo" },
    //author_photo: "https://scontent.fmex26-1.fna.fbcdn.net/v/t39.30808-1/449156869_862809449217692_8164237232418266018_n.jpg?stp=c101.130.882.883a_dst-jpg_s200x200_tt6&_nc_cat=1&ccb=1-7&_nc_sid=f907e8&_nc_ohc=YmhdOXLa8bMQ7kNvwHd8uHA&_nc_oc=Adk-Iwzw5lUAG_G002OZNzV7SOGPUAcXtgmSia9q-LZxwtXtnm2W33fTVmcdHcDtwLc&_nc_zt=24&_nc_ht=scontent.fmex26-1.fna&_nc_gid=p8eY-N7_fWEc7UY7NOd5qA&oh=00_AfG-S2-rUoY9vCF03vJAmqxhqPJKe_AO1tZdQFAOGPiB_g&oe=68106610",
    mainImageUrl: "https://i0.wp.com/mexicoaeroespacial.mx/wp-content/uploads/2021/03/153113695_873398216790289_234344220774594419_o.jpg?resize=690%2C450&ssl=1",
    date: format_date("2021-02-03"),
    link: "https://mexicoaeroespacial.mx/2021/03/02/el-satelite-mexicano-nanoconnect-2-esta-en-orbita/",
    content_file_name: "Full article content...",
    source: ESource_to_NewSource(ENewsSource.MEXICO_AEROSPACE),
  },
  {
    id: "news-1",
    tittle: "Ssa anula procedimiento de licitación de medicamentos a sobreprecio",
    person_author: { id: "a1", name: "Sarah Connor" },
    //author_photo: "https://www.milenio.com/bundles/appcamusassets/dist/images/icons/180x180.png",
    mainImageUrl: "https://cdn.milenio.com/uploads/media/2025/04/09/federacion-investiga-licitacion-medicamentos-sobrecosto.jpg",
    date: format_date("2025-04-09"),
    link: "https://www.milenio.com/politica/anulan-procedimiento-de-licitacion-de-medicamentos-a-sobreprecio",
    content_file_name: "Full article content...",
    source: ESource_to_NewSource(ENewsSource.MILENIO),
  },
  {
    id: "news-2",
    tittle: "Con nulidad del proceso de medicamentos se evitó daño a finanzas por 13 mil mdp",
    person_author: { id: "a2", name: "Elon Tusk" },
    //author_photo: "https://www.milenio.com/bundles/appcamusassets/dist/images/icons/180x180.png",
    mainImageUrl: "https://cdn.milenio.com/uploads/media/2025/04/10/gobierno-federal-cancelo-compra-medicamentos.jpg",
    date: format_date("2025-04-10"),
    link: "https://www.milenio.com/politica/nulidad-compra-medicamentos-evito-dano-13-mil-mdp-ssa",
    content_file_name: "Full article content...",
    source: ESource_to_NewSource(ENewsSource.MILENIO),
  },
];

export default mockNews;