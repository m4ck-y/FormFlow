import { Flex } from "antd";
import Card from "../../../components/form/card";
import CardEditable from "../../../components/form/CardEditable";
import { Input } from "@heroui/react";
import { Select, SelectSection, SelectItem } from "@heroui/select";
import React from "react";

const FormNew: React.FC = () => {
  const [selected, setSelected] = React.useState<undefined|string>(undefined);

  return (
    <Flex
      className="h-screen"
      style={{ backgroundColor: "gray" }}
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
          selectedKeys={selected ? [selected] : []}
          onSelectionChange={(keys) => setSelected(keys.currentKey)}
          variant="underlined"
          color="primary"
        >
          <SelectItem key="cat">Cat</SelectItem>
          <SelectItem key="dog">Dog</SelectItem>
          <SelectItem key="bird">Bird</SelectItem>
        </Select>
      </CardEditable>
    </Flex>
  );
};
export default FormNew;
