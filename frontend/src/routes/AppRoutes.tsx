import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../modules/auth/login"
import Register from "../modules/auth/register"
import ViewForm from '../modules/forms/test/index'
import FormInfo from "../modules/forms/design/index"
import TestUI from "../modules/test";
import FormIndex from "@/modules/forms";

export const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ViewForm/>} />
                <Route path="/form" element={<FormIndex/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/form/design" element={<FormInfo/>} />
                <Route path="/test" element={<TestUI/>} />
            </Routes>
        </BrowserRouter>
    )
}