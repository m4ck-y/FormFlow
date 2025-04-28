import { NewsList } from "./components/NewList";
import mockNews from "./news.mook.data";
import LayoutForm from "@/layouts/form";
import Header from "@/components/form/header/header";
import { Flex } from "antd";
import NewAdd from "./components/NewAdd";
import { useEffect, useState } from "react";
import { NewPost, NewPostApi } from "@/domain/entity/NewPost";
import { List_NewPostApi_to_NewPost} from "@/domain/dto/news/new";

export const NewsFeedPage = () => {
  const [news, setNews] = useState<NewPost[]>([]);

  useEffect(() => {

    console.log("MOOK NEWS", mockNews);
    const fetchNews = async () => {
      const response = await fetch("http://192.168.100.100:6616/getListNews?offset=1");

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }


      const data = (await response.json()) as NewPostApi[];

      console.log("data PostApi", data);

      const data_dto = List_NewPostApi_to_NewPost(data);
      console.log("data PostDto", data_dto);
      setNews(data_dto);
    };

    fetchNews();
    
  }, []);
  return (
    <LayoutForm>
      <Header />
      <Flex
        vertical
        gap={20}
        align="center"
        style={{
          //backgroundColor: "rgb(222,209,255)",
          /* background:
            "radial-gradient(circle, rgba(222,209,255,1) 0%, rgba(218,255,252,1) 100%)", */
          paddingBottom: "20px",
          minHeight: "100vh",
          paddingTop: "20px",
        }}
      >
        {/* <Card
          >
            <CardBody> */}
        <main className="p-6 max-w-4xl mx-auto">
          <h1
            className="text-2xl font-bold mb-6"
            style={{ paddingBottom: "1.5rem" }}
          ></h1>
          <NewAdd />
          <div style={{ padding: "20px" }}></div>
          <NewsList posts={news} />
        </main>
        {/* </CardBody>
        </Card> */}
      </Flex>
    </LayoutForm>
  );
};
