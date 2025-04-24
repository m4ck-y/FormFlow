import { Button, Card, CardBody, CardFooter, Input } from "@heroui/react";
import {Textarea} from "@heroui/input";
import { Flex } from "antd";
import SVG_Image from "@/assets/icons/image";
import SVG_Emoji from "@/assets/icons/emoji";
import SVG_Starts from "@/assets/icons/starts";

const NewAdd = () => {
    return (
        <Card>
            <CardBody>
                <Flex>
                    <Textarea placeholder="Que esta pasando?..." />
                </Flex>
            </CardBody>
            <CardFooter>
                <Flex align="center" justify="space-between" className="w-full">
                    <Flex gap={10}>
                        <Button color="primary" radius="full" variant="light" isIconOnly>
                            <SVG_Starts />
                        </Button>
                        <Button color="primary" radius="full" variant="light" isIconOnly>
                            <SVG_Image />
                        </Button>
                        <Button color="primary" radius="full" variant="light" isIconOnly>
                            <SVG_Emoji />
                        </Button>
                    </Flex>

                    <Button color="primary" radius="full" variant="shadow">
                        Publicar
                    </Button>
                </Flex>
            </CardFooter>
        </Card>
    );
};

export default NewAdd;
