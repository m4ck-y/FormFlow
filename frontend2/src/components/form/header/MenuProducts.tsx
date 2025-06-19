import type { ITokenPayload } from "@/domain/models/auth/auth";
import {
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
} from "@heroui/react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@heroui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/AppRoutes";
import SVG_Grid from "@/assets/icons/view_grid";
import png_health from "@/assets/icons/png/dos-corazones.png";
import png_db from "@/assets/icons/png/bases-de-datos.png";
import png_nutrition from "@/assets/icons/png/dieta.png";
import png_news from "@/assets/icons/png/periodico.png";
import png_people from "@/assets/icons/png/usuarios.png";

import { Flex } from "antd";

const MenuProduct: React.FC = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    let products: IProduct[] = [
        {
            label: "Mi salud",
            url_icon: png_health,
        },
        {
            label: "Noticias",
            url_icon: png_news,
            link: ROUTES.NEWS,
        },
        {
            label: "Nutrición",
            url_icon: png_nutrition,
        },
        {
            label: "Bases de datos",
            url_icon: png_db,
        },
        {
            label: "Usuarios",
            url_icon: png_people,
        },
    ];

    return (
        <>
            <Button
                isIconOnly
                radius="full"
                color="secondary"
                variant="light"
                onPress={onOpen}
            >
                <SVG_Grid />
            </Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                backdrop="blur"
                size="sm"
            >
                <ModalContent>
                    <ModalBody
                        style={{ border: "1px solid #e5e7eb", paddingBlock: "20px" }}
                    >
                        <Flex justify="center" gap={20} wrap>
                            {products.map((product: IProduct) => {
                                return (
                                    <ProductButton
                                        key={product.label}
                                        label={product.label}
                                        url_icon={product.url_icon}
                                        link={product.link}
                                    />
                                );
                            })}
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

interface IProduct {
    label: string;
    url_icon: string;
    link?: ROUTES;
}

const ProductButton: React.FC<IProduct> = ({ url_icon, label, link }) => {
    let size_px = "50px";
    let size_px2 = "100px";

    const navigate = useNavigate();

    return (
        <Button
            style={{ width: size_px2, height: size_px2 }}
            variant="light"
            color="primary"
            isIconOnly
            radius="full"
            onPress={() => navigate(link!)}
        >
            <Flex vertical justify="center" align="center">
                <img src={url_icon} style={{ width: size_px, height: size_px }} />
                <span style={{ fontSize: "10px", color: "gray" }}>{label}</span>
            </Flex>
        </Button>
    );
};

export default MenuProduct;
