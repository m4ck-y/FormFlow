// src/features/news/pages/NewsDetailPage.tsx

import { useParams } from "react-router-dom";
import data from "../new.mook.data"

export const NewsDetailPage = () => {
  const { id } = useParams();

  // Aquí deberías usar un usePostById o similar para traer el detalle real
  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Noticia: {id}</h1>
      <p className="text-gray-600 mb-2">{"Contenido de la noticia"}</p>
    </main>
  );
};
