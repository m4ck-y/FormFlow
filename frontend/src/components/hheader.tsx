import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
} from "@heroui/react";

import MenuProfile from "./header/MenuProfile";
import flow from "../assets/flow.png";
import { useNavigate } from "react-router-dom";

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
                        Features
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link aria-current="page" color="secondary" href="#">
                        Customers
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Integrations
                    </Link>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent as="div" justify="end">
                <MenuProfile />
            </NavbarContent>
        </Navbar>
    );
}
