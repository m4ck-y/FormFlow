import { Flex } from "antd";
import Card from "../../../components/form/card";
import CardEditable from "../../../components/form/CardEditable";
import { Input } from "@heroui/react";
import { Select, SelectSection, SelectItem } from "@heroui/select";
import React from "react";
import {
    NodeIndexOutlined
  } from '@ant-design/icons';
import { QuestionType } from "../../../domain/enum/question/types";
import { questionTypeLabels } from "../../../domain/maps/question/types";

const FormNew: React.FC = () => {
  //const [selected, setSelected] = React.useState<undefined|string>(undefined);
  const [selectedType, setSelectedType] = React.useState<QuestionType>(QuestionType.TEXT);

  return (
    <Flex
      className="h-screen"
      style={{ backgroundColor: "rgb(222,209,255)",
        background: "radial-gradient(circle, rgba(222,209,255,1) 0%, rgba(218,255,252,1) 100%)" }}
      align="center"
      vertical={false}
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
          placeholder="Tipo de pregunta"
          value={questionTypeLabels[selectedType]}
          selectedKeys={selectedType ? [selectedType] : []}
          onSelectionChange={(keys) => {console.log(keys.currentKey);setSelectedType(keys.currentKey as any)}}
          variant="underlined"
          color="primary"
        >
            
        {Object.values(QuestionType).map((type) => (
            <SelectItem key={type}>
              {questionTypeLabels[type]} {/* Aquí mostramos la etiqueta amigable */}
            </SelectItem>
          ))}
        </Select>
      </CardEditable>
    </Flex>
  );
};
export default FormNew;
