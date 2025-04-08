import { Card, CardHeader, CardBody, Avatar } from "@heroui/react";
import background from "@/assets/account/background.jpeg";
import { Flex } from "antd";

const Profile: React.FC = () => {
    return (
        <Card
            style={{
                maxWidth: "700px",
            }}
        >
            {/* Imagen de fondo */}
            <img
                src={background}
                alt="Background"
                className="w-full object-cover"
                style={{ height: "200px" }}
            />
            <Avatar
                showFallback
                src={"/profile-image.jpg"}
                size="lg"
                className="absolute bottom-2 left-4"
                style={{
                    top: "150px",
                    height: "100px",
                    width: "100px",
                    left: "20px",
                }}
            />
            <CardBody style={{ marginTop: "50px" }}>
                <Flex align="start" gap={2}>
                <h3 className="text-xl font-bold">Nombre del Usuario</h3>
                {/* Conocido como */}
                <p className="text-sm text-default-500 ml-4">Conocido como</p>
                </Flex>
                <p className="text-sm text-default-500">Título Profesional</p>
                <p className="mt-4">
                    Descripción del perfil y experiencia profesional...
                </p>
            </CardBody>
        </Card>
    );
};

export default Profile;
