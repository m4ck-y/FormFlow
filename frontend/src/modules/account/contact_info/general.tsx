import { Button, Input, Select, SelectItem } from "@heroui/react";

const General: React.FC = () => {
    return (
        <>
            <h1 className="text-2xl font-bold">Email</h1>
            <Input label="Email" variant="bordered" />
            <Select label="Type" variant="bordered">
                <SelectItem>Personal</SelectItem>
                <SelectItem>Trabajo</SelectItem>
                <SelectItem>Otro</SelectItem>
            </Select>
            <div>
                <Button variant="light" color="primary">
                    + Agregar
                </Button>
            </div>

            <h1 className="text-2xl font-bold">Telefono</h1>
            <Input label="Numero" variant="bordered" />
            <Select label="Type" variant="bordered">
                <SelectItem>Personal</SelectItem>
                <SelectItem>Trabajo</SelectItem>
                <SelectItem>Otro</SelectItem>
            </Select>
            <div>
                <Button variant="light" color="primary">
                    + Agregar
                </Button>
            </div>

            <h1 className="text-2xl font-bold">Direccion</h1>
            <Input label="Direccion" variant="bordered" />
            <Select label="Type" variant="bordered">
                <SelectItem>Personal</SelectItem>
                <SelectItem>Trabajo</SelectItem>
                <SelectItem>Otro</SelectItem>
            </Select>
        </>
    );
};

export default General;
