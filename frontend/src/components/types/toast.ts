import { ToastProps } from "@heroui/toast";

/* export toast_settings: {
    description: string;
    endContent: React.ReactNode; // Corregido de "endContend" a "endContent"
    color: ToastProps["color"]; // Usa el tipo específico de color del Toast
    variant: ToastProps["variant"];
} = {
    description: "",
    endContent: null, // Corregido de "endContend" a "endContent"
    color: "success",
    variant: "solid",
}; */


export interface IToastSettings {
    description: string;
    endContent: React.ReactNode; // Corregido de "endContend" a "endContent"
    color: ToastProps["color"]; // Usa el tipo específico de color del Toast
    variant: ToastProps["variant"];
}