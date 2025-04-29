import LayoutForm from "@/layouts/form";
import Header from "@/components/form/header/header";
import { useLocation } from "react-router-dom";
import { NewPost, NewPostApi } from "@/domain/entity/NewPost";
import { useEffect, useState } from "react";
import { NewPostApi_to_NewPost } from "@/domain/dto/news/new";
import mockNews from "../news.mook.data";
import { Link } from "@heroui/link";
import new_mook_data from "../new.mook.data";
import "./index.css";
import NewDetailHeader from "./components/header";
import { Flex } from "antd";
import { Image } from "@heroui/image";

export const NewDetailPage = () => {
  const { search } = useLocation();
  const id = new URLSearchParams(search).get("id");

  //const [newDetail, setNewDetail] = useState<NewPost>();
  const [newDetail, setNewDetail] = useState<NewPost>(mockNews[0]);
  const [contentHTML, setContentHTML] = useState<string>(new_mook_data);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch(
        "http://192.168.100.100:6616/getNewData/" + id
      );

      console.warn("response", response);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else {
        const data = (await response.json()) as NewPostApi;
        console.log("data PostApi", data);

        const data_dto = NewPostApi_to_NewPost(data);

        console.log("data PostDto", data_dto);

        setContentHTML((data as any)["article"]);
        setNewDetail(data_dto);
      }
    };

    fetchNews();
  }, []);

  console.log("id", id, newDetail);

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
          /* paddingTop: "20px", */
        }}
      >
        <div style={{position: "relative", height: "200px", width: "100%", display: "flex", justifyContent: "center"}}>
          <div
          className="w-full object-cover"
          style={{
            backgroundImage: `url(${newDetail?.mainImageUrl})`,
            height: "200px",
            display: "flex",
            justifyContent: "center",
            //backgroundSize: "cover",
            filter: "blur(8px)",
            position: "absolute",
          }}>
        
        </div>
          <Image src={newDetail?.mainImageUrl} height={200} />
        </div>
        <main className="w-full" style={{ maxWidth: "700px" }}>
          <Flex
            //justify="start"
            vertical
            align="start"
            gap={20}
            style={{
              maxWidth: "1024px",
              margin: "0 auto",
              backgroundColor: "white",
            }}
          >
            <NewDetailHeader
              author_name={
                newDetail?.person_author ? newDetail.person_author.name : null
              }
              company_link={newDetail.source.link}
              company_logo={newDetail.source.logoUrl}
              company_name={newDetail.source.name}
              link={newDetail.link}
              tittle={newDetail.tittle}
              new_date={newDetail.date}
            />

            <div
              className="new_detail_content"
              dangerouslySetInnerHTML={{ __html: contentHTML }}
            ></div>

            <span>
              Fuente: &nbsp;
              <Link href={newDetail?.link} target="_blank">
                {newDetail?.link}
              </Link>
            </span>
          </Flex>
        </main>
        {/* </CardBody>
        </Card> */}
      </Flex>
    </LayoutForm>
  );
};
