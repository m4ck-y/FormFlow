import Card from "@/components/card";
import { Input } from "@heroui/react";
import React, { useEffect } from "react";
import { NodeIndexOutlined } from "@ant-design/icons";
import type { IDetailForm } from "@/domain/models/form";

const COMPONENT = "forms/design/components/CardForm.tsx"

interface IProps{
  title?: string;
  description?: string;
  form: IDetailForm;
  setForm: React.Dispatch<React.SetStateAction<IDetailForm>>
}

const CardForm: React.FC<IProps> = ({title, description}) => {

  const [formTitle, setFormTitle] = React.useState(title);
  const [formDescription, setFormDescription] = React.useState(description);

  console.error(">>>", COMPONENT, "CardForm rendered with title:", title, "and description:", description);

  useEffect(() => {
    console.log(">>>", COMPONENT, "CardForm mounted with title:", title, "and description:", description);
    setFormTitle(title || "");
    setFormDescription(description || "");

  }, [title, description]);
  

  const titleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormTitle(e.target.value);
  };

  const descriptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDescription(e.target.value);
  };

  return (
    <Card>
      <Input
        placeholder="Titulo del formulario"
        value={formTitle}
        //isClearable
        //onClear={() => setFormTitle("")}
        variant="underlined"
        size="lg"
        color="primary"
        startContent={
          <div className="pointer-events-none flex items-center">
            <NodeIndexOutlined />
          </div>
        }
        onChange={titleHandler}
      />

      <Input
        placeholder="Descripcion"
        value={formDescription}
        variant="underlined"
        //isClearable
        color="primary"
        onChange={descriptionHandler}
      />
    </Card>
  );
};

export default CardForm;
