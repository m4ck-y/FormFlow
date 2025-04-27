import { ITokenPayload } from "@/domain/models/auth/auth";
import {
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar,
    User,
} from "@heroui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/AppRoutes";
import SVG_Settings from "@/assets/icons/settings";
import SVG_UserSettings from "@/assets/icons/user_settings";
import SVG_HelpFeedBack from "@/assets/icons/help_feedback";
import SVG_Power from "@/assets/icons/power";

const MenuProfile: React.FC = () => {
    const navigate = useNavigate();

    const basic_info: ITokenPayload = JSON.parse(
        localStorage.getItem("basic_info") || "{}"
    );

    return (
        <Dropdown placement="bottom-end" showArrow>
            <DropdownTrigger>
                <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="secondary"
                    name={basic_info.name}
                    getInitials={(name) => name.charAt(0)}
                    showFallback
                    size="sm"
                    src={basic_info.url_photo}
                />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">{basic_info.username}</p>
                </DropdownItem>
                <DropdownItem key="profile" isReadOnly className=" gap-2 opacity-100">
                    <User
                        avatarProps={{
                            size: "lg",
                            className: "w-14 h-14 text-large",
                            src: basic_info.url_photo,
                        }}
                        classNames={{
                            name: "text-default-600",
                            description: "text-default-500",
                        }}
                        description={basic_info.username}
                        name={basic_info.name}
                    />
                </DropdownItem>
                <DropdownItem startContent={<SVG_UserSettings/>} key="settings" onPress={() => navigate(ROUTES.ACCOUNT)}>
                    Mi Cuenta
                </DropdownItem>
                <DropdownItem startContent={<SVG_Settings/>} key="configurations">Configuraciones</DropdownItem>
                <DropdownItem startContent={<SVG_HelpFeedBack/>} key="help_and_feedback">Help & Feedback</DropdownItem>
                <DropdownItem startContent={<SVG_Power/>} key="logout" color="danger">
                    Salir
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default MenuProfile;
