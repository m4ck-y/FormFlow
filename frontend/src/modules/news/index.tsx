import { NewsList } from "./components/NewList";
import mockNews from "./news.mook.data";
import LayoutForm from "@/layouts/form";
//import Header from "@/components/form/header/header";
import Header from "@/modules/news/components/header"
import { Flex } from "antd";
import NewAdd from "./components/NewAdd";
import { useEffect, useState, useCallback, useRef } from "react";
import { NewPost, NewPostApi } from "@/domain/entity/NewPost";
import { List_NewPostApi_to_NewPost} from "@/domain/dto/news/new";

export const NewsFeedPage = () => {
  const [news, setNews] = useState<NewPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const offsetRef = useRef(0);
  const isFetchingRef = useRef(false); // evita duplicación por llamadas simultáneas

  const fetchNews = useCallback(async () => {
    if (isFetchingRef.current || !hasMore) return;

    isFetchingRef.current = true;
    setIsLoading(true);

    try {
      const response = await fetch(
        `http://192.168.100.100:6616/getListNews?offset=${offsetRef.current}`
      );

      if (!response.ok) throw new Error("Network response was not ok");

      const data = (await response.json()) as NewPostApi[];

      if (data.length === 0) {
        setHasMore(false);
        return;
      }

      const data_dto = List_NewPostApi_to_NewPost(data);
      setNews((prev) => [...prev, ...data_dto]);

      offsetRef.current += 1;
    } catch (e) {
      console.error("Error fetching news", e);
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, [hasMore]);

  useEffect(() => {
    fetchNews(); // primera carga
  }, [fetchNews]);

  useEffect(() => {
    const handleScroll = () => {
      const isBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;

      if (isBottom && !isLoading && hasMore) {
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
          paddingBottom: "20px",
          minHeight: "100vh",
          paddingTop: "20px",
        }}
      >
        <main className="p-6 max-w-4xl mx-auto">
          <NewAdd />
          <div style={{ padding: "20px" }} />
          <NewsList posts={news} />
          {isLoading && <p>Cargando más noticias...</p>}
          {!hasMore && <p>No hay más noticias para mostrar.</p>}
        </main>
      </Flex>
    </LayoutForm>
  );
};