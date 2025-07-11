import Card from "@/components/card";
import { Button, Input, Select, SelectItem } from "@heroui/react";
import React, { useEffect } from "react";
import { NodeIndexOutlined } from "@ant-design/icons";
import type { IDetailForm } from "@/domain/models/form";
import { Flex } from "antd";
import SVG_Plus from "@/assets/icons/plus";
import {Image} from "@heroui/image";
import img_web from "@/assets/icons/png/web.jpg";

import styles from "./CardReferences.module.css";

enum ETypeMedia{
    Link = 1,
    File
}

interface IReference{
    url_reference: string,
    name: string
    notes: string
    url_thumbnail: string
    type_media: ETypeMedia
}


const CardReferences: React.FC = () => {


    const [references, setReferences] = React.useState<IReference[]>([]);

    useEffect(() => {
        setReferences([
            {
                url_reference: "https://www.phqscreeners.com/images/sites/g/files/g10016261/f/201412/PHQ-9_English.pdf",
                name: "PHQ-9 Cuestionario de Depresión",
                notes: "Cuestionario para evaluar la severidad de la depresión.",
                url_thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/PHQ-9_example.png/320px-PHQ-9_example.png",
                type_media: ETypeMedia.Link
            },
            {
                url_reference: "https://www.stanford.edu/~yesavage/GDS.english.long.pdf",
                name: "Escala de Depresión Geriátrica (GDS)",
                notes: "Herramienta para evaluar depresión en adultos mayores.",
                url_thumbnail: "https://www.mdapp.co/img/gds-15.png",
                type_media: ETypeMedia.Link
            },
            {
                url_reference: "https://www.hads.org.uk/",
                name: "Escala de Ansiedad y Depresión Hospitalaria (HADS)",
                notes: "Cuestionario para detección de ansiedad y depresión en pacientes hospitalizados.",
                url_thumbnail: "https://www.mdcalc.com/media/hads.png",
                type_media: ETypeMedia.Link
            }
        ]);
    }, []);


    return (
        <Card>
            <h1>Referencias</h1>
            <Flex vertical align="end">
                <Button variant="shadow" radius="full" isIconOnly size="sm" color="primary"> <SVG_Plus /></Button>

                <Flex vertical gap={5} className={styles.references_container}>
                    {references.map((reference, index) => (
                        <Flex key={index} align="start" className={"w-full " + styles.reference_item}>
                            <Image src={img_web} fallbackSrc={img_web} height={50} />
                            <div className={styles.reference_item_detail}>
                                <p className="text-black text-tiny">{reference.name}</p>
                                <p className="text-black text-tiny">{reference.notes}</p>

                                <a>{reference.url_reference}</a>
                            </div>
                        </Flex>
                    ))}
                </Flex>
            </Flex>
        </Card>

    )
}

export default CardReferences;