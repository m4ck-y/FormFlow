import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Flex } from "antd";

import AuthLayout from "../../layouts/auth";
import { useNavigate } from "react-router-dom"; // Importamos el hook useNavigate

const Register: React.FC = () => {
    const navigate = useNavigate(); // Usamos el hook para la navegación

    return (
        <AuthLayout>
            <Flex vertical gap="middle">
                <Typography variant="h4" gutterBottom>
                    Únete usando tu correo electrónico.
                </Typography>
                <div>Ingresa tu correo para comenzar el proceso de registro.</div>
            </Flex>

            <Flex vertical gap="middle" style={{ width: "600px" }}>
                <TextField
                    id="outlined-basic"
                    label="Correo electronico"
                    variant="outlined"
                />
                <div>
                    Te enviaremos un enlace para verificar tu dirección y continuar con el
                    registro.
                </div>
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
                    <Button color="primary" variant="shadow">
                        Siguiente
                    </Button>
                </Flex>
            </Flex>
        </AuthLayout>
    );
};

export default Register;
