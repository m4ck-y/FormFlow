import Login from "@/modules/auth/login";
import Register from "@/modules/auth/register";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export enum ROUTES {
    INDEX = '/',
    LOGIN = '/login',
    REGISTER = '/register',
}


export const AppRoutes: React.FC = () => {
    //TODO: .env
    return <BrowserRouter basename="/FormFlow"> 
        <Routes>
            <Route path={ROUTES.INDEX} element={<Login />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.REGISTER} element={<Register />} />
        </Routes>
    </BrowserRouter>;
}