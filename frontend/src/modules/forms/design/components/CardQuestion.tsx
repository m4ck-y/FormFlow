import { Flex } from "antd";
import Card from "../../../../components/card";
import CardEditable from "../../../../components/form/CardEditable";
import { Input } from "@heroui/react";
import { Select, SelectSection, SelectItem } from "@heroui/select";
import React, { useEffect } from "react";
import {
  NodeIndexOutlined
} from '@ant-design/icons';
import { QuestionType } from "../../../../domain/enum/question/types";
import { ListQuestionObtionsLabels } from "../../../../domain/form/question_type";
import { ListQuestionTextLabels } from "../../../../domain/form/question_type";
import { questionComponents } from "../map";
import { Textarea } from "@heroui/react";


const CardQuestion: React.FC = () => {
  const [selectedType, setSelectedType] = React.useState<Set<QuestionType>>(new Set([QuestionType.RADIO]));


  useEffect(() => {
    console.info("selectedType", selectedType);
  }, [selectedType]);

  return (
    <CardEditable>
      <Flex align="start" gap={10}>


        <Textarea
          isClearable
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
      {[...selectedType][0] && questionComponents[[...selectedType][0]]}
    </CardEditable>
  )
}

export default CardQuestion;