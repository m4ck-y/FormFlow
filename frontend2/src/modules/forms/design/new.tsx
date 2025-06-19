import { Flex } from "antd";
import React from "react";
import CardForm from "./components/CardForm";
import CardQuestion from "./components/CardQuestion";

const FormNew: React.FC = () => {

  return (
    <Flex
      //className="h-screen"
      style={{
        minHeight: "100vh",
        backgroundColor: "rgb(222,209,255)",
        background: "radial-gradient(circle, rgba(222,209,255,1) 0%, rgba(218,255,252,1) 100%)",
        paddingBottom: "20px",
      }}
      align="center"
      vertical={true}
    >
      <CardForm/>

      <CardQuestion/>

      <CardQuestion/>

      <CardQuestion/>

    </Flex>
  );
};
export default FormNew;
