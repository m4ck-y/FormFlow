import SVG_Options from "@/assets/icons/options";
import { Button, Card as HCard, CardBody, CardFooter } from "@heroui/react";
import {Avatar, AvatarGroup, AvatarIcon} from "@heroui/avatar";
import { Flex } from "antd";

export enum EBackgroundGradient {
    GreenBlue = "radial-gradient(at 12% 7%, rgb(202, 237, 223) 0px, transparent 50%), radial-gradient(at 11% 87%, rgb(160, 210, 254) 0px, transparent 50%), radial-gradient(at 80% 7%, rgb(181, 226, 227) 0px, transparent 50%), radial-gradient(at 80% 90%, rgb(202, 237, 223) 0px, transparent 50%), rgb(255, 255, 255)",
    OrangeYellow = "radial-gradient(at 91% 12%, rgb(244, 189, 169) 0px, transparent 50%), radial-gradient(at 9% 13%, rgb(249, 199, 199) 0px, transparent 50%), radial-gradient(at 91% 89%, rgb(249, 199, 199) 0px, transparent 50%), radial-gradient(at 9% 88%, rgb(255, 232, 168) 0px, transparent 50%), rgb(255, 255, 255)",
    BluePurple = "radial-gradient(at 90% 13%, rgb(195, 194, 255) 0px, transparent 50%), radial-gradient(at 11% 88%, rgb(229, 204, 255) 0px, transparent 50%), radial-gradient(at 82% 82%, rgb(230, 240, 255) 0px, transparent 50%), radial-gradient(at 12% 7%, rgb(230, 240, 255) 0px, transparent 50%), rgb(255, 255, 255)",
}

interface IProps {
    tittle?: string;
    uploaded_by?: string;
    date?: string;
    responses?: number;
}

const Card: React.FC<IProps> = ({ tittle, uploaded_by, responses, date }) => {
    console.warn("ColorStyle, ", EBackgroundGradient.BluePurple);
    return (
        <HCard
            isPressable
            disableRipple
            style={{
                height: "160px",
                //width: "200px",
                minWidth: "200px",
                maxWidth: "300px",
                background: EBackgroundGradient.OrangeYellow,
            }}
        >
            <CardBody className="overflow-visible p-0"></CardBody>
            <CardFooter className="text-small justify-between bg-white">
                <Flex vertical align="start" className="w-full">
                    <Flex align="center" gap={2} className="w-full">
                    <Avatar showFallback name="Macari" size="sm" src="jhttps://i.pravatar.cc/150?u=a04258a2462d826712d" />
                    <p className="text-black text-tiny">{tittle}</p>
                    </Flex>
                    <Flex justify="space-between" align="center" className="w-full">
                        <p
                            className="text-slate-200 text-tiny"
                            style={{ color: "#607d8b" }}
                        >
                            Modificado {date ? date : "hace 2 dias"}
                        </p>
                        <Button isIconOnly radius="full" variant="light" size="sm" color="primary"><SVG_Options/></Button>
                    </Flex>
                </Flex>
            </CardFooter>
        </HCard>
    );
};
export default Card;
