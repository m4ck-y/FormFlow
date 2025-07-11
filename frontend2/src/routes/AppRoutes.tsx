import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../modules/auth/login";
import { UserNameProvider } from "@/context/login/username";
import FormDesign from "@/modules/forms/design/index";
import FormIndex from "@/modules/forms";

export enum ROUTES {
    FORM = "/form",
    LOGIN = "/login",
    LOGIN_PASSWORD = "/login/password",
    OTP = "/otp",
    REGISTER = "/register",
    REGISTER_PERSONAL_INFO = "/register/personal_info",
    REGISTER_CREATE_PASSWORD = "/register/create_password",
    FORM_DESIGN = "/form/design",

    ACCOUNT = "/account",

    NEWS = "/news",

    NEW_DETAIL = "/new",

    TEST = "/test",
}

export const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route path={ROUTES.FORM} element={<FormIndex />} />

                <Route path={ROUTES.FORM_DESIGN} element={<FormDesign />} />
                <Route path={ROUTES.FORM_DESIGN + "/:id"} element={<FormDesign />} />

                <Route
                    path={ROUTES.LOGIN}
                    element={
                        <UserNameProvider>
                            <Login />
                        </UserNameProvider>
                    }
                />
            
            </Routes>
        </BrowserRouter>
    );
};
