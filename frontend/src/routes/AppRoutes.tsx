import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../modules/auth/login";
import Register from "../modules/auth/register";
import ProfileSetup from "@/modules/auth/profile_setup";
import PsswordSetup from "@/modules/auth/password_setup";
//import ViewForm from '../modules/forms/test/index'
import FormInfo from "../modules/forms/design/index";
import TestUI from "../modules/test";
import FormIndex from "@/modules/forms";
import OTP from "@/modules/auth/otp";
import LoginPassword from "@/modules/auth/login_password";
import { UserNameProvider } from "@/context/login/username";
import ProtectedRoute from "./ProptectedUsername";
import Account from "@/modules/account";
import { NewsFeedPage } from "@/modules/news";
import { NewDetailPage } from "@/modules/news/detail";

export enum ROUTES {
    FORM = "/form",
    LOGIN = "/",
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
                {/* <Route path="/" element={<ViewForm/>} /> */}
                <Route path={ROUTES.FORM} element={<FormIndex />} />
                <Route path={ROUTES.OTP} element={<OTP />} />
                <Route path={ROUTES.REGISTER} element={<Register />} />
                <Route
                    path={ROUTES.REGISTER_PERSONAL_INFO}
                    element={<ProfileSetup />}
                />
                <Route
                    path={ROUTES.REGISTER_CREATE_PASSWORD}
                    element={<PsswordSetup />}
                />
                <Route path={ROUTES.FORM_DESIGN} element={<FormInfo />} />
                <Route path={ROUTES.TEST} element={<TestUI />} />

                <Route path={ROUTES.ACCOUNT} element={<Account />} />

                <Route path={ROUTES.NEW_DETAIL} element={<NewDetailPage />} />
                
                <Route path={ROUTES.NEWS} element={<NewsFeedPage />} />

                <Route
                    path={ROUTES.LOGIN}
                    element={
                        <UserNameProvider>
                            <Login />
                        </UserNameProvider>
                    }
                />
                <Route
                    path={ROUTES.LOGIN_PASSWORD}
                    element={
                        <UserNameProvider>
                            <ProtectedRoute>
                                <LoginPassword />
                            </ProtectedRoute>
                        </UserNameProvider>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};
