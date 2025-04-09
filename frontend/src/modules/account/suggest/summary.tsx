import image_file from "@/assets/file.png";
import { Button } from "@heroui/react";
import { Flex } from "antd";
const Summary: React.FC = () => {
  return (
    <Flex vertical style={{ padding: "20px", border: "1px solid #e8e8e8" }} className="border-orange-200" gap={10}>
      <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
        <img style={{ width: "50px" }} src={image_file}></img>
        <span>
          Escribe un resumen que refleje tu personalidad y experiencia laboral
        </span>
      </div>
      <span className="text-sm text-500">Cuéntanos un poco sobre ti: tu experiencia, lo que te apasiona y lo que te hace único. ¡Nos interesa tu historia!</span>
      <Button variant="bordered" radius="full" color="primary" className="w-max">Agregar resumen</Button>
    </Flex>
  );
};

export default Summary;
