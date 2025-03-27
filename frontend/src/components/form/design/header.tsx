import SVG_Theme from "@/assets/icons/theme";
import SVG_Eye from "@/assets/icons/eye";
import SVG_Save from "@/assets/icons/save";
import SVG_Options from "@/assets/icons/options";
import { Tooltip } from "@heroui/tooltip";
import {
    NavbarItem,
    Link,
    Button,
} from "@heroui/react";
import HeaderBase from "@/components/form/header/header";

const Header: React.FC = () => {
    return (
        <HeaderBase
            center={
                <>
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
                </>
            }

            end={
                <>
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
                </>
            }
        />
    );
};

export default Header;