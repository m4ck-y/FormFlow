import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../modules/auth/login"
import Register from "../modules/auth/register"
import ViewForm from '../modules/forms/index'
import FormAdd from "../modules/forms/form_add"

export const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ViewForm/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/form/new" element={<FormAdd/>} />
            </Routes>
        </BrowserRouter>
    )
}