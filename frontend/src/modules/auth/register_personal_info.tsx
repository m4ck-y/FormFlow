import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Link } from "@heroui/link";
import { Flex } from "antd";

import AuthLayout from "../../layouts/auth";
import { useNavigate } from "react-router-dom"; // Importamos el hook useNavigate
import {  Button } from "@heroui/react";

const RegisterPersonalInfo: React.FC = () => {
    const navigate = useNavigate(); // Usamos el hook para la navegación

    const params = new URLSearchParams(window.location.search);

    const email = params.get("email");

    const [nameValue, setNameValue] = React.useState("");
    const [lastNameValue, setLastNameValue] = React.useState("");
    const [secondLastNameValue, setSecondLastNameValue] = React.useState("");

    return (
        <AuthLayout>
            <Flex vertical gap="middle">
                <Typography variant="h4" gutterBottom>
                    Registro de Datos Personales
                </Typography>
                <div>Necesitamos algunos datos basicos.</div>
            </Flex>

            <Flex vertical gap="middle" style={{ width: "600px" }}>
                <TextField
                    id="outlined-basic"
                    label="Nombre(s)"
                    variant="outlined"
                    onChange={(e) => setNameValue(e.target.value)}
                />
                <TextField
                    id="outlined-basic"
                    label="Primer apellido"
                    variant="outlined"
                    onChange={(e) => setLastNameValue(e.target.value)}
                />
                <TextField
                    id="outlined-basic"
                    label="Segundo apellido"
                    variant="outlined"
                    onChange={(e) => setSecondLastNameValue(e.target.value)}
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
                        onPress={() => {
                            navigate(`/register/create_password?first_name=${nameValue}&last_name=${lastNameValue}&second_last_name=${secondLastNameValue}&email=${email}`);
                        }}
                    >
                        Siguiente
                    </Button>
                </Flex>
            </Flex>
        </AuthLayout>
    );
};

export default RegisterPersonalInfo;
