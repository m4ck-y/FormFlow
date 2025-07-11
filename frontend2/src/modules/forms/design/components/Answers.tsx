import { EQuestionType } from "@/domain/enum/question/types";
import type { IDetailAnswer } from "@/domain/models/form";
import { use, useEffect, useState } from "react";
import { questionComponents } from "../map";

interface IProps {
  data: IDetailAnswer[]; // Define the type of data as needed
  selectedType?: EQuestionType;
}

const Answers: React.FC<IProps> = ({ data, selectedType }) => {

    const [answers, setAnswers] = useState<IDetailAnswer[]>(data || []);
    const [selectedTypeState, setSelectedTypeState] = useState<EQuestionType | undefined>(selectedType);

    useEffect(() => {
        setAnswers(data || []);
        setSelectedTypeState(selectedType);
    }, [data, selectedType]);


    return <>
    {selectedTypeState && questionComponents[selectedTypeState]}
    </>
}


export default Answers;