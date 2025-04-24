import { NewsList } from "./components/NewList";
import mockNews from "./news.mook.data";
import LayoutForm from "@/layouts/form";
import Header from "@/components/form/header/header";
import { Flex } from "antd";
import NewAdd from "./components/NewAdd";

export const NewsFeedPage = () => {
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
          >
          </h1>
          <NewAdd />
          <div style={{padding: "20px"}}></div>
          <NewsList posts={mockNews} />
        </main>
            {/* </CardBody>
        </Card> */}
      </Flex>
    </LayoutForm>
  );
};
