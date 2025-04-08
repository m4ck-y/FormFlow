import { Flex } from "antd";
import LayoutAccount from "@/layouts/account";
import Header from "@/components/form/header/header";
import Card from "@/components/card";
//import { CardBody} from "@heroui/card";
import { CardHeader, CardBody, Avatar } from "@heroui/react";
import React from "react";
import background from "@/assets/account/background.jpeg";

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
                    paddingBottom: "20px",
                    minHeight: "100vh",
                }}
            >

                
                <Card>
                        {/* Imagen de fondo */}
                        <img
                            src={background}
                            alt="Background"
                            height={200}
                            className="w-full h-full object-cover"
                        />
                        {/* Avatar posicionado sobre la imagen de fondo */}
                        <div className="absolute bottom-12 left-4">
                            <Avatar
                                showFallback
                                src={"/profile-image.jpg"}
                                size="lg"
                                isBordered
                                color="primary"
                                className="w-24 h-24 avatar ----"
                            />
                        </div>
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
