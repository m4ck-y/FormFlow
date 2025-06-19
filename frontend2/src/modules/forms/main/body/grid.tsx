import Card from "@/modules/forms/main/components/card";
import { Flex } from "antd";
import { useEffect, useState } from "react";


interface IForm {
    key: string;
    name: string;
    description: string;
    id: number;
}

const Grid: React.FC = () => {

    const [forms, setForms] = useState<IForm[]>([
        { key: "1", name: "Formulario 1", description: "Descripción 1", id: 1 },
        { key: "2", name: "Formulario 2", description: "Descripción 2", id: 2 },
        { key: "3", name: "Formulario 3", description: "Descripción 3", id: 3 },
        { key: "4", name: "Formulario 4", description: "Descripción 4", id: 4 },
    ]);

    useEffect(() => {
        //'http://localhost:7000/form/list'

        fetch("http://localhost:7000/form/list").then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        }).then((data) => {
            console.log("Data fetched: ", data);
            setForms(data);
        }).catch((error) => {
            console.error("There was a problem with the fetch operation:", error);
        });
    }, []);


    return (
        <Flex gap={27} wrap justify="center" style={{padding:"20px"}}>
            {forms.map((form, index) => (
                <Card
                    key={index}
                    tittle={form.name}
                    uploaded_by="Macari"
                    date="hace 2 dias"
                    responses={10}
                />
            ))}
        </Flex>
    )
}

export default Grid;