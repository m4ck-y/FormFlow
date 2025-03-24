import React from "react";
import LayoutForm from "../../../layouts/form";
import { Tab, Tabs } from "@heroui/react";
import FormNew from "./new";

const FormInfo: React.FC = () => {
    return (
        <LayoutForm>

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
            <Tab key="respuestas" title="Respuestas" />
        </Tabs>
        </LayoutForm>
    );
};

export default FormInfo;