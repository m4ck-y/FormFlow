import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Link } from "@heroui/link";
import { Flex } from "antd";

import AuthLayout from "../../layouts/auth";
import { useNavigate } from "react-router-dom"; // Importamos el hook useNavigate

import { UserService } from "@/api/user";
import { addToast, Button } from "@heroui/react";

const MIN_PASSWORD_LENGTH = 8;

const CreatePassword: React.FC = () => {
    const navigate = useNavigate(); // Usamos el hook para la navegación

    const params = new URLSearchParams(window.location.search);
    const email = params.get("email") || "";
    const firstName = params.get("first_name") || "";
    const lastName = params.get("last_name") || "";
    const secondLastName = params.get("second_last_name") || "";
    


    const [password, setPasswordValue] = React.useState("");
    const [password2, setPasswordValue2] = React.useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorPassword2, setErrorPassword2] = useState("");

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPasswordValue(value);

        if (value.length < MIN_PASSWORD_LENGTH) {
            setErrorPassword("La contraseña debe tener al menos 8 caracteres.");
        } else {
            setErrorPassword("");
        }
    };

    const handlePassword2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPasswordValue2(value);

        if (value !== password) {
            setErrorPassword2("Las contraseñas no coinciden.");
        } else {
            setErrorPassword2("");
        }
    };

    const isFormValid = password.length >= MIN_PASSWORD_LENGTH && password === password2;

    const api = new UserService();

    return (
        <AuthLayout>
            <Flex vertical gap="middle">
                <Typography variant="h4" gutterBottom>
                    Creacion de contraseña
                </Typography>
                <div>Asegúrate de recordarla o guardarla en un lugar seguro.</div>
            </Flex>

            <Flex vertical gap="middle" style={{ width: "600px" }}>
                <TextField
                    id="outlined-basic"
                    label="Contraseña"
                    variant="outlined"
                    type="password"
                    error={!!errorPassword}
                    helperText={errorPassword}
                    onChange={handlePasswordChange}
                />
                <TextField
                    id="outlined-basic"
                    label="Confirmar contraseña"
                    variant="outlined"
                    type="password"
                    error={!!errorPassword2}
                    helperText={errorPassword2}
                    onChange={handlePassword2Change}
                />
                <div>Asegurate de que la informacion sea la correcta.</div>

                <Typography variant="body1" gutterBottom>
                    ¿Esta no es tu computadora? Usa una ventana privada para acceder.
                    <Link
                        isExternal
                        href="https://support.google.com/chrome/answer/95464?hl=es-419&co=GENIE.Platform%3DDesktop"
                    >
                        Más información para usar el modo privado.
                    </Link>
                </Typography>
                <Flex gap="middle">
                    <Button
                        color="primary"
                        variant="light"
                        onPress={() => navigate("/login")}
                    >
                        Iniciar sesion
                    </Button>
                    <Button
                        color="primary"
                        variant="shadow"
                        isDisabled={!isFormValid}
                        onPress={() => {
                           console.log("email", email, firstName, lastName, secondLastName, password, password2);
                           api.Register(firstName, lastName, secondLastName, email, password).then((response) => {
                               console.log("response", response);
                           })
                        }}
                    >
                        Crear cuenta
                    </Button>
                </Flex>
            </Flex>
        </AuthLayout>
    );
};

export default CreatePassword;
