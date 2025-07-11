import { Flex } from "antd";
import CardEditable from "@/components/form/CardEditable";
import { Select, SelectSection, SelectItem } from "@heroui/select";
import React, { useEffect } from "react";
import { EQuestionType } from "@/domain/enum/question/types";
//import { ListQuestionObtionsLabels } from "../../../../domain/form/question_type";
import { ListQuestionObtionsLabels, ListQuestionTextLabels } from "@/domain/form/question_type";
import { questionComponents } from "../map";
import { Textarea } from "@heroui/react";


const COMPONENT = "forms/design/components/CardQuestion.tsx"

import type { IDetailQuestion } from "@/domain/models/form";
import Answers from "./Answers";


interface IProps {data?: IDetailQuestion;}

const CardQuestion: React.FC<IProps> = ({ data }) => {
  const [text, setText] = React.useState<string>("");
  const [order, setOrder] = React.useState<number>(0);
  const [id, setId] = React.useState<number>(0);
  const [listAnwers, setListAnswers] = React.useState<IDetailQuestion["list_answers"]>([]);

  //const [selectedType, setSelectedType] = React.useState<QuestionType>(QuestionType.TEXT);
  const [selectedType, setSelectedType] = React.useState<Set<EQuestionType>>(new Set([EQuestionType.TEXT]));
  

  useEffect(() => {
    console.log(">>>", COMPONENT, "CardQuestion component mounted", data);
    if (data) {
      console.log(">>>", COMPONENT, "CardQuestion data", data); //data?.list_questions
    } else {
      console.warn(">>>", COMPONENT, "No data found for CardQuestion");
    }
    setText(data?.text || "");
    setOrder(data?.order || 0);
    setId(data?.id || 0);
    setListAnswers(data?.list_answers || []);
    //setSelectedType(data?.type || QuestionType.TEXT);
    setSelectedType(new Set([data?.type || EQuestionType.TEXT])); // Aseguramos que sea un Set
  }, [data]);



  useEffect(() => {
    console.error(">>>", COMPONENT, "selectedType", selectedType);
  }, [selectedType]);

  return (
    <CardEditable>
      <Flex align="start" gap={10}>


        <Textarea
          isClearable
          value={text}
          placeholder="Nombre de la pregunta"
          variant="underlined"
          size="lg"
          color="primary"
          classNames={{
             //base: "h-[40px]", // Ajusta la altura del contenedor base
            input: "min-h"
          }}        />
        <Select
          selectedKeys={selectedType}
          selectionMode="single"
          onSelectionChange={setSelectedType as any}
          variant="bordered"
          radius="none"
          color="primary"
        >
          <SelectSection title="Texto">
            {ListQuestionTextLabels.map((item) => (
              <SelectItem key={item.id}>{item.label}</SelectItem>
            ))}
          </SelectSection>
          <SelectSection title="Opciones">
            {ListQuestionObtionsLabels.map((item) => (
              <SelectItem key={item.id}>{item.label}</SelectItem>
            ))}
          </SelectSection>
        </Select>
      </Flex>
      {/* Renderiza el componente correspondiente según el tipo seleccionado */}
      {/* {[...selectedType][0] && questionComponents[[...selectedType][0]]} */}
      
      <Answers data={listAnwers} selectedType={[...selectedType][0]} />
    </CardEditable>
  )
}

export default CardQuestion;