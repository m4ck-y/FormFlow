import React, { useEffect } from "react";
import LayoutForm from "@/layouts/form";
import { Tab, Tabs } from "@heroui/react";
import FormNew from "@/modules/forms/design/new";
//import Header from "@/components/form/design/header";
import Header from "@/components/form/design/header";
import { useParams } from 'react-router-dom';
import type { IDetailForm } from "@/domain/models/form";
import { EQuestionType } from "@/domain/enum/question/types";
import FormConfig from "./config";



const COMPONENT = "forms/design/index.tsx"

const FormInfo: React.FC = () => {

    const { id } = useParams();

    const [form, setForm] = React.useState<IDetailForm>({
        id: 0,
        name: "Formulario sin titulo",
        description: "",
        list_questions: [{
            id: 0,
            order: 1,
            text: "Pregunta sin titulo",
            type: EQuestionType.SINGLE_CHOICE,
            list_answers: [{
                id: 0,
            }],
        }],
        estimated_duration: null,
        key: null,
        list_categories: [],
        list_references: [],
        list_sections: [],
        list_what_it_evaluate: [], target_age_group: null, target_sex: null
    });

    useEffect(() => {

        if (!id) {
            console.error( ">>>",COMPONENT, "No form ID provided in the URL");
            return;
        }
        console.warn(">>>", COMPONENT, "Fetching form id:", id);
        //curl -X 'GET' 'http://localhost:7000/form/1' -H 'accept: application/json'
        fetch(`http://localhost:7000/form/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(">>>", COMPONENT, "Form data fetched: ", data);
            setForm(data);
        })
        .catch(error => {
            console.error(">>>", COMPONENT, 'There was a problem with the fetch operation:', error);
        });
        
    }, [id]);

    return (
        <LayoutForm>
        <Header/>
        <Tabs
            aria-label="Tabs variants"
            variant="underlined"
            color="secondary"
            classNames={{
                tabList: "p-0"
              }}
            className="justify-center"
            >
            <Tab key="preguntas" title="Preguntas" className="p-0">
                <FormNew data={form} setData={setForm}/>
            </Tab>
            <Tab key="configuracion" title="Configuracion">
                <FormConfig />
            </Tab>
            <Tab key="respuestas" title="Respuestas" />
        </Tabs>
        </LayoutForm>
    );
};

export default FormInfo;