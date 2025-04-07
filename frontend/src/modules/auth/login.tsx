import React from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography, TextField } from "@mui/material";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { addToast } from "@heroui/react";
import { UserService } from "@/api/user";
import { ROUTES } from "../../routes/AppRoutes";
import AuthLayout from "../../layouts/auth";
import { useUsername } from "@/context/login/username";

// Interfaz para el estado del formulario
interface LoginFormState {
    email: string;
    error: string;
}

const Login: React.FC = () => {

    const { setUsername: setUserNameInContext  } = useUsername(); // Usamos el hook para acceder al contexto

    const navigate = useNavigate();
    const [formState, setFormState] = React.useState<LoginFormState>({
        email: "",
        error: ""
    });

    const userService = new UserService();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState(prev => ({
            ...prev,
            email: e.target.value,
            error: ""
        }));
    };

    const handleRegisterClick = () => navigate(ROUTES.REGISTER);

    const handleSubmit = async () => {
        try {
            const response = await userService.Exists(formState.email);

            if (response.status !== 200) {

                addToast({
                    title: "Error",
                    description: response.error?.message || "Error desconocido",
                    color: "danger",
                    variant: "solid",
                });
                return;
            }

            if (response.value) {
                setUserNameInContext(formState.email); // Guardamos el username en el contexto
                navigate(ROUTES.LOGIN_PASSWORD);
                //navigate(ROUTES.LOGIN_PASSWORD, {state: { username: formState.email }});
            } else {
                setFormState(prev => ({
                    ...prev,
                    error: "El correo no esta registrado"
                }));
            }
        } catch (error) {
            addToast({
                title: "Error",
                description: "Error al verificar el correo",
                color: "danger",
                variant: "solid",
            });
        }
    };

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
                    id="email-input"
                    label="Correo electronico"
                    variant="outlined"
                    type="email"
                    value={formState.email}
                    onChange={handleEmailChange}
                    error={!!formState.error}
                    helperText={formState.error}
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
                        onPress={handleRegisterClick}
                    >
                        Registrarme
                    </Button>
                    <Button
                        color="primary"
                        variant="shadow"
                        onPress={handleSubmit}
                    >
                        Siguiente
                    </Button>
                </Stack>
            </Stack>
        </AuthLayout>
    );
};

export default Login;
