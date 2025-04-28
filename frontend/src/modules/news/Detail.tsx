import LayoutForm from "@/layouts/form";
import Header from "@/components/form/header/header";
import { Avatar, Flex } from "antd";
import { useLocation } from "react-router-dom";
import { NewPost, NewPostApi } from "@/domain/entity/NewPost";
import { useEffect, useState } from "react";
import { NewPostApi_to_NewPost } from "@/domain/dto/news/new";
import mockNews from "./news.mook.data";
import { Typography } from "@mui/material";
import { Link } from "@heroui/link";
import new_mook_data from "./new.mook.data";
import { Button } from "@heroui/react";
import SVG_Link from "@/assets/icons/link";

export const NewDetailPage = () => {
  const { search } = useLocation();
  const id = new URLSearchParams(search).get("id");

  //const [newDetail, setNewDetail] = useState<NewPost>();
  const [newDetail, setNewDetail] = useState<NewPost | null>();
  const [contentHTML, setContentHTML] = useState<string>(
    "<div>NOT FOUND</div>"
  );

  useEffect(() => {
    const fetchNews = async () => {
      const response = await fetch(
        "http://192.168.100.100:6616/getNewData/" + id
      );

      if (!response.ok) {
        //throw new Error("Network response was not ok");
        setNewDetail(mockNews[0]);
        setContentHTML(new_mook_data);
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
          backgroundColor: "rgb(222,209,255)",
          background:
            "radial-gradient(circle, rgba(222,209,255,1) 0%, rgba(218,255,252,1) 100%)",
          paddingBottom: "20px",
          minHeight: "100vh",
          /* paddingTop: "20px", */
        }}
      >
        {/* <Card
          >
            <CardBody> */}
        <img
          src={newDetail?.mainImageUrl}
          className="w-full object-cover"
          style={{ height: "400px" }}
        />
        <main className="w-full">
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
            <Flex vertical={false}>
              <Typography variant="h4">{newDetail?.tittle}</Typography>
              <Link href={newDetail?.link}>
                <Button
                  isIconOnly
                  radius="full"
                  variant="light"
                  color="primary"
                >
                  <SVG_Link />
                </Button>
              </Link>
            </Flex>
            <Flex vertical={false} gap={5}>
              <Avatar src={newDetail?.source.logoUrl} />
              <Link href={newDetail?.source.link} target="_blank">
                {newDetail?.source.name}
              </Link>
            </Flex>

            <Flex vertical={true} gap={5}>
              {newDetail?.person_author && (
                <span className="text-gray-700 mb-4">
                  {newDetail.person_author.name}
                </span>
              )}
              {newDetail?.date && <span>{newDetail.date}</span>}
            </Flex>

            <div dangerouslySetInnerHTML={{ __html: contentHTML }}></div>

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
