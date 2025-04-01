import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../modules/auth/login"
import Register from "../modules/auth/register"
import RegisterPersonalInfo from "@/modules/auth/register_personal_info";
import CreatePassword from "@/modules/auth/create_password";
//import ViewForm from '../modules/forms/test/index'
import FormInfo from "../modules/forms/design/index"
import TestUI from "../modules/test";
import FormIndex from "@/modules/forms";
import OTP from "@/modules/auth/otp";

export const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" element={<ViewForm/>} /> */}
                <Route path="/form" element={<FormIndex/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/otp" element={<OTP/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/register/personal_info" element={<RegisterPersonalInfo/>} />
                <Route path="/register/create_password" element={<CreatePassword/>} />
                <Route path="/form/design" element={<FormInfo/>} />
                <Route path="/test" element={<TestUI/>} />
            </Routes>
        </BrowserRouter>
    )
}