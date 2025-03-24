import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../modules/auth/login"
import Register from "../modules/auth/register"
import ViewForm from '../modules/forms/index'
import FormInfo from "../modules/forms/info/index"

export const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ViewForm/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/form/info" element={<FormInfo/>} />
            </Routes>
        </BrowserRouter>
    )
}