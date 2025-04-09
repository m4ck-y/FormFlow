import {
    Card,
    CardHeader,
    CardBody,
    Avatar,
    Button,
    Link,
} from "@heroui/react";
import Summary from "./summary";

const Suggest: React.FC = () => {
    return (
        <Card
            style={{
                maxWidth: "700px",
            }}
        >
            {/* Imagen de fondo */}

            <CardHeader className="p-4 pb-0">
                <span className="text-xl font-bold">Sugerencias para ti</span>
            </CardHeader>

            <CardBody style={{ marginTop: "20px" }} className="p-4">
                <Summary/>
            </CardBody>
        </Card>
    );
};

export default Suggest;
