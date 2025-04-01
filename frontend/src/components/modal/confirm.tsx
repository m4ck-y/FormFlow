import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalProps,
} from "@heroui/react";

interface IProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onConfirm: () => void;
    title?: React.ReactNode;
    message?: React.ReactNode;
    confirmText?: string;
    cancelText?: string;
    confirmColor?: "primary" | "secondary" | "success" | "warning" | "danger";
    size?: ModalProps["size"];
    isDismissable?: boolean;
}

function ConfirmationModal({
    isOpen,
    onOpenChange,
    onConfirm,
    title = "Confirmar acción",
    message = "¿Estás seguro de que deseas realizar esta acción?",
    confirmText = "Confirmar",
    cancelText = "Cancelar",
    confirmColor = "primary",
    size = "md",
    isDismissable = true,
}: IProps) {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size={size}
            isDismissable={isDismissable}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>{title}</ModalHeader>
                        <ModalBody>{message}</ModalBody>
                        <ModalFooter>
                            <Button color="danger" variant="light" onPress={onClose}>
                                {cancelText}
                            </Button>
                            <Button
                                color={confirmColor}
                                onPress={() => {
                                    onConfirm();
                                    onClose();
                                }}
                            >
                                {confirmText}
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default ConfirmationModal;
