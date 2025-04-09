import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
  } from "@heroui/react";
import General from "./general";

  interface IProps {
    isOpen: boolean;
    onOpenChange: () => void;
  }
  
  const ContactInfo: React.FC<IProps> = ({
    isOpen,
    onOpenChange,
  }: IProps) => {
    return (
        <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange} size="xl" scrollBehavior="inside">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Informacion de contacto</ModalHeader>
                <ModalBody>
                  <General />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cancelar
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Aceptar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
    );
};
  
export default ContactInfo;