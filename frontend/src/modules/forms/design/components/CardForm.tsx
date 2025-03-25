import Card from "../../../../components/form/card";
import { Input } from "@heroui/react";
import React from "react";
import {
  NodeIndexOutlined
} from '@ant-design/icons';


const CardForm: React.FC = () => {
    return (
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
    )
}

export default CardForm;