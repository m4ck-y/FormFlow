import {
    Card,
    CardHeader,
    CardBody,
    Avatar,
    Button,
    Link,
} from "@heroui/react";
import background from "@/assets/account/background.jpeg";
import { Flex } from "antd";
import SVG_Pencil from "@/assets/icons/pencil";
import SVG_Verified from "@/assets/icons/verified";
import { useState } from "react";
import EditInfoGeneral from "./EditInfoGeneral";
import ContactInfo from "./contact_info";

const Profile: React.FC = () => {

    const [isOpenEditInfo, setIsOpenEditInfo] = useState(false);
    const [isOpenEditContact, setIsOpenEditContact] = useState(false);

    const onOpenChangeEditInfo = () => setIsOpenEditInfo(!isOpenEditInfo);
    const onOpenChangeEditContact = () => setIsOpenEditContact(!isOpenEditContact);

    return (
        <Card
            style={{
                maxWidth: "700px",
                width: "100%",
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
            <CardBody style={{ marginTop: "20px" }} className="p-4">
                <Flex vertical gap={5}>
                <Flex justify="end">
                    <Button isIconOnly radius="full" variant="light" color="primary" onPress={onOpenChangeEditInfo}>
                        <SVG_Pencil />
                    </Button>
                </Flex>
                <Flex align="end" gap={5}>
                    <Flex gap={2}>
                        <h3 className="text-xl font-bold">Nombre del Usuario</h3>
                        <SVG_Verified className="text-primary" />
                    </Flex>
                    <EditInfoGeneral isOpen={isOpenEditInfo} onOpenChange={onOpenChangeEditInfo}/>
                    {/* Conocido como */}
                    <p className="text-sm text-default-500 ml-4">Known as</p>
                </Flex>
                <p className="mt-4">Software Engineer</p>
                <Flex gap={5} align="center">
                    <p className="text-sm text-default-500">Mexico, CDMX</p>
                    <span>&#183;</span>
                    <Link href="#" className="text-sm font-semibold ml-4" onPress={onOpenChangeEditContact}>
                        Contact info
                    </Link>
                    <ContactInfo isOpen={isOpenEditContact} onOpenChange={onOpenChangeEditContact}/>
                </Flex>
                <Link>
                    https://mipagina.com
                </Link>
                </Flex>
            </CardBody>
        </Card>
    );
};

export default Profile;
