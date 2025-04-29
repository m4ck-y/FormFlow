import { NewsList } from "./components/NewList";
import mockNews from "./news.mook.data";
import LayoutForm from "@/layouts/form";
import Header from "@/components/form/header/header";
import { Flex } from "antd";
import NewAdd from "./components/NewAdd";
import { useEffect, useState, useCallback } from "react";
import { NewPost, NewPostApi } from "@/domain/entity/NewPost";
import { List_NewPostApi_to_NewPost} from "@/domain/dto/news/new";

export const NewsFeedPage = () => {
  const [news, setNews] = useState<NewPost[]>([]);

  const [offset, setOffset] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchNews = useCallback(async () => {

    if (isLoading || !hasMore) return;


    setIsLoading(true);

    try{

    const response = await fetch("http://192.168.100.100:6616/getListNews?offset=" + offset);

    if (!response.ok) throw new Error("Network response was not ok")

      const data = (await response.json()) as NewPostApi[];

      if (data.length === 0) {
        console.log("No more news");
        setHasMore(false);
        return;
      }
      const data_dto = List_NewPostApi_to_NewPost(data);
      console.log("data PostDto", data_dto);
      setNews(prev => [...prev, ...data_dto]);
      setOffset(prev => prev + 1);

    }catch(e){
      console.error("Error al obtener noticias", e);
    }finally{
      setIsLoading(false)
    }
  }, [offset, isLoading, hasMore]);

  useEffect(() => {
    fetchNews();
    
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
        !isLoading &&
        hasMore
      ) {
        fetchNews();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNews, isLoading, hasMore]);

  return (
    <LayoutForm>
      <Header />
      <Flex
        vertical
        gap={20}
        align="center"
        style={{
          /* backgroundColor: "rgb(222,209,255)",
          background:
            "radial-gradient(circle, rgba(222,209,255,1) 0%, rgba(218,255,252,1) 100%)", */
          paddingBottom: "20px",
          minHeight: "100vh",
          paddingTop: "20px",
        }}
      >
        <main className="p-6 max-w-4xl mx-auto">
          <h1
            className="text-2xl font-bold mb-6"
            style={{ paddingBottom: "1.5rem" }}
          ></h1>
          <NewAdd />
          <div style={{ padding: "20px" }}></div>
          <NewsList posts={news} />
          {isLoading && <p>Cargando más noticias...</p>}
          {!hasMore && <p>No hay más noticias para mostrar.</p>}
        </main>
      </Flex>
    </LayoutForm>
  );
};
