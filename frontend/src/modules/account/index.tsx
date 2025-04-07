import { Flex } from "antd";
import LayoutAccount from "@/layouts/account";
import Header from "@/components/form/header/header";
//import Card from "@/components/card";
//import { CardBody} from "@heroui/card";
import { Card, CardHeader, CardBody, Avatar } from "@heroui/react";
import React from "react";

const Account: React.FC = () => {
    return (
        <LayoutAccount>
            <Header />
            <Flex
                justify="center"
                style={{
                    backgroundColor: "rgb(222,209,255)",
                    background:
                        "radial-gradient(circle, rgba(222,209,255,1) 0%, rgba(218,255,252,1) 100%)",
                }}
                className="h-screen"
            >
                <Card className="max-w-md">
                    <CardHeader className="relative h-32 p-0 overflow-hidden">
                        {/* Imagen de fondo */}
                        <img
                            src="/background-image.jpg"
                            alt="Background"
                            className="w-full h-full object-cover"
                        />
                        {/* Avatar posicionado sobre la imagen de fondo */}
                        <div className="absolute -bottom-12 left-4">
                            <Avatar
                                src="/profile-image.jpg"
                                size="lg"
                                isBordered
                                color="primary"
                                className="w-24 h-24"
                            />
                        </div>
                    </CardHeader>
                    <CardBody className="pt-12 px-4">
                        <h3 className="text-xl font-bold">Nombre del Usuario</h3>
                        <p className="text-sm text-default-500">Título Profesional</p>
                        <p className="mt-4">
                            Descripción del perfil y experiencia profesional...
                        </p>
                    </CardBody>
                </Card>
            </Flex>
        </LayoutAccount>
    );
};

export default Account;
