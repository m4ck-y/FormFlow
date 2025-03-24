import { Flex } from "antd";
import Card from "../../../components/form/card";
import CardEditable from "../../../components/form/CardEditable";
import { Input } from "@heroui/react";
import { Select, SelectSection, SelectItem } from "@heroui/select";
import React, { useEffect } from "react";
import {
  NodeIndexOutlined
} from '@ant-design/icons';
import { QuestionType } from "../../../domain/enum/question/types";
import { ListQuestionObtionsLabels } from "../../../domain/form/question_type";
import { ListQuestionTextLabels } from "../../../domain/form/question_type";
import { questionComponents } from "../../../modules/forms/info/map";


const FormNew: React.FC = () => {
  const [selectedType, setSelectedType] = React.useState<Set<QuestionType>>(new Set([QuestionType.RADIO]));


  useEffect(() => {
    console.info("selectedType", selectedType);
  }, [selectedType]);
  

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
      <Card>
        <Input
          placeholder="Titulo del formulario"
          isClearable
          variant="underlined"
          size="lg"
          color="primary"
          startContent={
            <div className="pointer-events-none flex items-center">
              <NodeIndexOutlined />
            </div>
          }
        />


        <Input placeholder="Descripcion" variant="underlined" isClearable color="primary" />
      </Card>
      <CardEditable>
        <Input
          isClearable
          placeholder="Nombre de la pregunta"
          variant="underlined"
          size="lg"
          color="primary"
        />
        <Select
          selectedKeys={selectedType}
          selectionMode="single"
          onSelectionChange={setSelectedType as any}
          variant="underlined"
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
        {/* Renderiza el componente correspondiente según el tipo seleccionado */}
        {[...selectedType][0] && questionComponents[[...selectedType][0]]}
      </CardEditable>
    </Flex>
  );
};
export default FormNew;
