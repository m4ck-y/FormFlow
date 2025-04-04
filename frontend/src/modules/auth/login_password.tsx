import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

import { Flex } from "antd";
import AuthLayout from "../../layouts/auth";

import { Button } from "@heroui/button";

import { Link } from "@heroui/link";
import { UserService } from "@/api/user";
import { addToast } from "@heroui/react";

const LoginPassword: React.FC = () => {
    const navigate = useNavigate(); // Usamos el hook para la navegación

    const [emailValue, setEmailValue] = React.useState("");
    const [errorEmail, setErrorEmail] = React.useState("");

    const api = new UserService();

    return (
        <AuthLayout>
            <Stack spacing={2}>
                <Typography variant="h4" gutterBottom>
                    Ingresa tu Contraseña
                </Typography>
                <div>Por favor, ingresa la contraseña que creaste al registrarte para acceder a tu cuenta.</div>
            </Stack>

            <Stack spacing={2} width={"600px"}>
                <TextField
                    id="outlined-basic"
                    label="Correo electronico"
                    variant="outlined"
                    onChange={(e) => setEmailValue(e.target.value)}
                    type="email"
                    error={!!errorEmail}
                    helperText={errorEmail}
                />
                <Link href="#" underline="none">
                    ¿Olvidaste tu contraseña?
                </Link>
                <Typography variant="body1" gutterBottom>
                    ¿Esta no es tu computadora? Usa una ventana privada para acceder.
                    <Link
                        isExternal
                        href="https://support.google.com/chrome/answer/95464?hl=es-419&co=GENIE.Platform%3DDesktop"
                    >
                        Más información para usar el modo privado.
                    </Link>
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Button
                        color="primary"
                        variant="light"
                        onPress={() => navigate("/register")}
                    >
                        Registrarme
                    </Button>
                    <Button color="primary" variant="shadow" onPress={()=>{
                        console.log("login",emailValue);
                        api.Exists(emailValue).then((res) => {
                            if (res.status != 200) {
                                addToast({
                                        title: "Error",
                                        description: res.error?.message || "Error desconocido",
                                        color: "danger",
                                        variant: "solid",
                                    })
                                    return;
                                }
                            if (res.status == 200) {

                                switch (res.value) {
                                    case true:
                                        navigate("/form");
                                        break;
                                    case false:
                                        setErrorEmail("El correo no esta registrado");
                                        break;

                            }}
                        });

                    }}>
                        Siguiente
                    </Button>
                </Stack>
            </Stack>
        </AuthLayout>
    );
};

export default Login;
