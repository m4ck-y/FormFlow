import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/auth";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { AuthService } from "@/api/auth";
import { addToast } from "@heroui/react";
import { useUsername } from "@/context/login/username";

const LoginPassword: React.FC = () => {

     const { username } = useUsername(); // Usamos el hook para acceder al contexto

    const navigate = useNavigate(); // Usamos el hook para la navegación


    console.log("username useUsername", username);

    const [passwordValue, setPasswordValue] = React.useState("");
    const [errorPassword, setErrorPassword] = React.useState("");

    const api = new AuthService();

    // Función para manejar el cambio de contraseña
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordValue(e.target.value);
        setErrorPassword("");  // Reseteamos el error cuando el usuario empieza a escribir
    };

    // Función para manejar el login
    const handleLogin = () => {
        console.log("login", passwordValue);
        api.Login(username, passwordValue).then((res) => {


            switch (res.status) {
                case 401:
                    setErrorPassword("Contraseña incorrecta");
                    break;
                case 200:
                    navigate("/form");
                    localStorage.setItem("basic_info", JSON.stringify(res.value));
                    break;
                default:
                    addToast({
                        title: "Error",
                        description: res.error?.message || "Error desconocido",
                        color: "danger",
                        variant: "solid",
                    });
                    break;
            }
        });
    };

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
                    label="Contraseña"
                    variant="outlined"
                    onChange={handlePasswordChange}
                    type="password"
                    error={!!errorPassword}
                    helperText={errorPassword}
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
                    <Button color="primary" variant="shadow" onPress={handleLogin}>
                        Iniciar sesión
                    </Button>
                </Stack>
            </Stack>
        </AuthLayout>
    );
};

export default LoginPassword;
