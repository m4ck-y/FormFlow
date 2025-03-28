import React from "react";
import LayoutForm from "@/layouts/form";
import Header from "@/components/form/header/header";
import Recent from "@/modules/forms/main/recent";
import Body from "@/modules/forms/main/body/index";

const FormIndex: React.FC = () => {
    return (
        <LayoutForm>
            <Header/>
            <Recent/>
            <Body/>
        </LayoutForm>
    );
}

export default FormIndex;