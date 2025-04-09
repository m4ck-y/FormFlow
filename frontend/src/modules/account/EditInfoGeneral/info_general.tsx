import {
    Input,
    Link,
    Select,
    SelectItem,
} from "@heroui/react";
import {Textarea} from "@heroui/input";


const InfoGeneral: React.FC = () => {
    return (
        <>
            <span>
                Si cambias tu nombre, es posible que debas re-verificar para mantener
                tu verificación.<Link>Saber mas</Link>
            </span>
            <Input label="Nombre(s)" variant="bordered" />
            <Input label="Primer apellido" variant="bordered" />
            <Input label="Segundoapellido" variant="bordered" />
            <Input label="Nombre adicional" variant="bordered" />
            <Select label="Pronombres" variant="bordered">
                <SelectItem>Ella</SelectItem>
                <SelectItem>El/El</SelectItem>
                <SelectItem>Ellos</SelectItem>
                <SelectItem>Personalizado</SelectItem>
            </Select>

            <Textarea label="Título" variant="bordered"></Textarea>

            <h1 className="text-2xl font-bold">Ubicación</h1>

            <Input label="País/Región" variant="bordered" />
            <Input label="Ciudad" variant="bordered" />

            <h1 className="text-2xl font-bold">Sitio web</h1>
            <span>
                Agrega un enlace que se mostrar en la parte superior de tu perfil
            </span>

            <Input label="Link" variant="bordered" />
            <Input
                label="Texto del link"
                variant="bordered"
                description="Personaliza cómo se mostrará tu enlace (opcional)"
            />
      </>
    );
};

export default InfoGeneral;
