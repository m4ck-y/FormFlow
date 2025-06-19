import React from "react";
import LayoutForm from "@/layouts/form";
import { Tab, Tabs } from "@heroui/react";
import FormNew from "@/modules/forms/design/new";
//import Header from "@/components/form/design/header";
import Header from "@/components/form/design/header";

const FormInfo: React.FC = () => {
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
                <FormNew/>
            </Tab>
            <Tab key="configuracion" title="Configuracion" />
            <Tab key="respuestas" title="Respuestas" />
        </Tabs>
        </LayoutForm>
    );
};

export default FormInfo;