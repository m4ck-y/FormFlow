import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

import { Flex } from "antd";
import AuthLayout from "../../layouts/auth";

import { Button } from "@heroui/button";

import { Link } from "@heroui/link";

const Login: React.FC = () => {
    const navigate = useNavigate(); // Usamos el hook para la navegación

    return (
        <AuthLayout>
            <Stack spacing={2}>
                <Typography variant="h4" gutterBottom>
                    Iniciar session
                </Typography>
                <div>Usa tu cuenta de formFLow</div>
            </Stack>

            <Stack spacing={2} width={"600px"}>
                <TextField
                    id="outlined-basic"
                    label="Correo electronico"
                    variant="outlined"
                />
                <Link href="#" underline="none">
                    ¿Olvidaste el correo electronico?
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
                    <Button color="primary" variant="shadow" onPress={()=>navigate("/form")}>
                        Siguiente
                    </Button>
                </Stack>
            </Stack>
        </AuthLayout>
    );
};

export default Login;
