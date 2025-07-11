import { Flex } from "antd";
import React, { useEffect } from "react";
import CardForm from "./components/CardForm";
import CardQuestion from "./components/CardQuestion";
import type { IDetailForm } from "@/domain/models/form";

const COMPONENT = "forms/design/new.tsx"

interface IProps {
  data?: IDetailForm
  setData?: React.Dispatch<React.SetStateAction<IDetailForm | undefined>>
}

const FormNew: React.FC<IProps> = ({ data, setData }) => {

  const [listQuestions, setListQuestions] = React.useState<IDetailForm["list_questions"]>([]);

  useEffect(() => {
    console.log(">>>", COMPONENT, "FormNew component mounted", data);
    if (data?.list_questions) {
      console.log(">>>", COMPONENT, "data.list_questions", data?.list_questions); //data?.list_questions
      setListQuestions(data.list_questions);
    } else {
      console.warn(">>>", COMPONENT, "No list_questions found in data");
    }
  }, [data]);

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
      <CardForm title={data?.name} description={data?.description} form={data} setForm={setData} />


      {        listQuestions.map((question, index) => (
        <CardQuestion key={index} data={question} /* question={question} */ />
      ))}

    </Flex>
  );
};
export default FormNew;
