import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
} from "@heroui/react";
import {Tooltip} from "@heroui/tooltip";

import MenuProfile from "./header/MenuProfile";
import flow from "../assets/flow.png";
import { useNavigate } from "react-router-dom";
import SVG_Theme from "../assets/icons/theme";
import SVG_Eye from "../assets/icons/eye";
import SVG_Save from "../assets/icons/save";
import SVG_Options from "../assets/icons/options";

export default function HHeader() {
    const navigate = useNavigate();
    return (
        <Navbar>
            <NavbarBrand onClick={() => navigate("/")}>
                <img src={flow} alt="" height="50px" width="50px" />
            </NavbarBrand>

            <NavbarContent className="sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="#">
                        A
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link aria-current="page" color="secondary" href="#">
                        B
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        C
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent as="div" justify="end">
                <Button isIconOnly radius="full" color="secondary" variant="light">
                    <SVG_Theme />
                </Button>
                <Button isIconOnly radius="full" color="secondary" variant="light">
                    <SVG_Eye />
                </Button>
                <Tooltip content="guardar" placement="bottom" showArrow={true}>
                <Button isIconOnly color="secondary" variant="shadow">
                    <SVG_Save />
                    {/* Guardar */}
                </Button>
    </Tooltip>
                <Button isIconOnly radius="full" color="secondary" variant="light">
                    <SVG_Options />
                </Button>
                <MenuProfile />
            </NavbarContent>
        </Navbar>
    );
}

//#TODO: investigar: https://floating-ui.com/docs/platform