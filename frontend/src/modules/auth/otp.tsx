import React from "react";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

import { Flex } from "antd";
import AuthLayout from "../../layouts/auth";

import { Button } from "@heroui/button";

import { Link } from "@heroui/link";
import { InputOtp } from "@heroui/input-otp";
import { OtpService } from "@/api/otp";
import { addToast } from "@heroui/react";

const OTP: React.FC = () => {
    const navigate = useNavigate(); // Usamos el hook para la navegación
    const [codeValue, setCodeValue] = React.useState("");

    const api = new OtpService();

    const params = new URLSearchParams(window.location.search);

    const email = params.get("email");

    console.warn("params", params);


    return (
        <AuthLayout>
            <Flex vertical gap="middle">
                <Typography variant="h4" gutterBottom>
                    Introduce el código que te enviamos
                </Typography>
                <div>Te enviamos un código a tu correo. Ingresa el código aquí para continuar.</div>
            </Flex>

            <Flex vertical gap="middle" style={{ width: "600px" }}>
                <Flex vertical={false} justify="center">
                    <InputOtp classNames={{
                        segmentWrapper: "gap-4"
                    }} length={6} value={codeValue} onValueChange={setCodeValue} size="lg" />
                </Flex>
                <div>
                    Si no encuentras el correo, revisa la carpeta de spam.
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
                <Flex justify="end" gap="middle" align="end">
                        <Typography variant="body1" gutterBottom>
                            ¿No recibiste el correo? <Link onPress={() => api.sendOtp(email!)}>Reenviar</Link>
                        </Typography>
                        

                    <Button
                    color="primary"
                    variant="shadow"
                    onPress={() => {

                        console.log("verificando email:", email, "code:", codeValue);
                        api.verifyOtp(email!, codeValue).then((res) => {

                            let description = "";

                            switch (res.status) {
                                case 200:
                                    description = "Correo verificado con exito";
                                    navigate("/register/personal_info?email=" + email);
                                    break;
                                case 400:
                                    description = "El codigo no es valido";
                                    break;
                                case 422:
                                    description = "El codigo no es valido";
                                    break;
                                default:
                                    description = "Error desconocido";
                                    break;
                            }

                            addToast({
                                title: res.status == 200 ? "Validado" : "Error",
                                description: description,
                                variant: "solid",
                                color: res.status == 200 ? "success" : "danger",
                            })
                        })
                    }}
                >
                    Verificar
                </Button>

                </Flex>

            </Flex>
        </AuthLayout >
    );
};

export default OTP;