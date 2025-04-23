import type { NewsPost } from "./new.type";

// Ejemplo mock para testeo
const mockNews: NewsPost[] = [
  {
    id: "news-1",
    title: "Ssa anula procedimiento de licitación de medicamentos a sobreprecio",
    author: { id: "a1", name: "Sarah Connor" },
    mainImageUrl: "https://cdn.milenio.com/uploads/media/2025/04/09/federacion-investiga-licitacion-medicamentos-sobrecosto.jpg",
    createdAt: new Date().toISOString(),
    link: "https://www.milenio.com/politica/anulan-procedimiento-de-licitacion-de-medicamentos-a-sobreprecio",
    content: "Full article content...",
  },
  {
    id: "news-2",
    title: "Con nulidad del proceso de medicamentos se evitó daño a finanzas por 13 mil mdp",
    author: { id: "a2", name: "Elon Tusk" },
    mainImageUrl: "https://cdn.milenio.com/uploads/media/2025/04/10/gobierno-federal-cancelo-compra-medicamentos.jpg",
    createdAt: new Date().toISOString(),
    link: "https://www.milenio.com/politica/nulidad-compra-medicamentos-evito-dano-13-mil-mdp-ssa",
    content: "Full article content...",
  },
];

export default mockNews;