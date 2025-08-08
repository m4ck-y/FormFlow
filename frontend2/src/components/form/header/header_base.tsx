import {
    Navbar,
    NavbarBrand,
    NavbarContent,
} from "@heroui/react";


import MenuProfile from "@/components/form/header/MenuProfile";
//import flow from "@/assets/flow.png";
import flow from "@/assets/logo.svg";
import { useNavigate } from "react-router-dom";

import React, { type ReactNode } from "react";
import MenuProduct from "./MenuProducts";

interface IProps {
    start?: ReactNode;
    center?: ReactNode;
    end?: ReactNode;
}

const Header: React.FC<IProps> = ({ start, center, end }) => {
    const navigate = useNavigate();
    return (
        <Navbar classNames={{ wrapper: "w-full --------" }}>
            <NavbarBrand onClick={() => navigate("/form")}>
                <img src={flow} alt="" height="50px" width="50px" />
            </NavbarBrand>

            {start ? (
                <NavbarContent as="div" justify="start">
                    {start}
                </NavbarContent>
            ) : (
                ""
            )}

            {center ? (
                <NavbarContent className="sm:flex gap-4" justify="center">
                    {center}
                </NavbarContent>
            ) : (
                ""
            )}

            <NavbarContent as="div" justify="end">
                {end}
                <MenuProduct />
                <MenuProfile />
            </NavbarContent>
        </Navbar>
    );
};

export default Header;

//#TODO: investigar: https://floating-ui.com/docs/platform
