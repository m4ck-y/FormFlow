import SVG_Calendar from "@/assets/icons/calendar";
import SVG_Link from "@/assets/icons/link";
import { Avatar, Button, Link } from "@heroui/react";
import { Typography } from "@mui/material";
import { Flex } from "antd";

interface IProps {
    link: string;
    tittle: string;
    company_logo: string;
    company_link: string;
    company_name: string;
    author_name: string | null;
    new_date: string;
}

const NewDetailHeader: React.FC<IProps> = ({
    author_name,
    company_link,
    company_logo,
    company_name,
    link,
    new_date,
    tittle,
}) => {
    return (
        <Flex vertical style={{ maxWidth: "600px", width: "100%", margin: "auto", paddingTop: "20px", gap: "10px" }}>

        
            <Flex vertical={false} style={{ maxWidth: "600px" }}>
                
                <Typography variant="h4">{tittle}<Link href={link}>
                    <Button isIconOnly radius="full" variant="light" color="primary">
                        <SVG_Link />
                    </Button>
                </Link></Typography>
            </Flex>
            <Flex vertical={false} gap={5} style={{ maxWidth: "600px" }}>
                <Avatar size="lg" src={company_logo} />
                <Link href={company_link} target="_blank">
                    {company_name}
                </Link>
            </Flex>

            <Flex vertical={false} gap={10} justify="end">
                {author_name && (
                    <span style={{ display:  "flex", gap: "2px", color: "gray" }}><Avatar size="sm" />{author_name}</span>
                )}
                {<span style={{ color: "gray", display: "flex", gap: "2px" }}><SVG_Calendar /> {new_date}</span>}
            </Flex>
        </Flex>
    );
};

export default NewDetailHeader;
