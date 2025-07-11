import { Button, Card, CardBody } from "@heroui/react";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@heroui/react";
import {
    DeleteFilled,
    CopyFilled,
    ArrowDownOutlined,
    ArrowUpOutlined,
    PicCenterOutlined,
    PlusOutlined,
    QuestionOutlined,
    MoreOutlined,
} from "@ant-design/icons";
import {Switch} from "@heroui/switch";
import type { PropsWithChildren } from "react";
import styles from "./CardEditable.module.css"
import SVG_Formula from "@/assets/icons/formula";

const CardEditable: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <Card
            className={styles.card_editable}
        >
            <header className="flex gap-3">
                <div className="flex gap-0 justify-end w-full pt-1  ">
                    <Button
                        isIconOnly
                        aria-label="Like"
                        color="primary"
                        size="sm"
                        radius="full"
                        variant="light"
                    >
                        <DeleteFilled />
                    </Button>
                    <Button
                        isIconOnly
                        aria-label="Like"
                        color="primary"
                        size="sm"
                        radius="full"
                        variant="light"
                    >
                        <CopyFilled />
                    </Button>
                    <Button
                        isIconOnly
                        aria-label="Like"
                        color="primary"
                        size="sm"
                        radius="full"
                        variant="light"
                    >
                        <ArrowUpOutlined />
                    </Button>
                    <Button
                        isIconOnly
                        aria-label="Like"
                        color="primary"
                        size="sm"
                        radius="full"
                        variant="light"
                    >
                        <ArrowDownOutlined />
                    </Button>
                </div>
            </header>
            <CardBody>{children}</CardBody>
            <footer className="flex gap-3 justify-end w-full">
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Button
                            isIconOnly
                            aria-label="Like"
                            color="primary"
                            size="sm"
                            radius="full"
                            variant="light"
                        >
                            <PlusOutlined />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Dropdown menu with icons" variant="faded">
                        <DropdownItem
                            key="new"
                            shortcut="⌘P"
                            startContent={<SVG_Formula />}
                        >
                            Condicion
                        </DropdownItem>
                        <DropdownItem
                            key="new"
                            shortcut="⌘P"
                            startContent={<QuestionOutlined />}
                        >
                            Pregunta
                        </DropdownItem>
                        <DropdownItem
                            key="copy"
                            shortcut="⌘S"
                            startContent={<PicCenterOutlined />}
                        >
                            Seccion
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Switch defaultSelected={false} aria-label="Automatic updates" isDisabled>Varias respuestas</Switch>
                <Switch defaultSelected={true} aria-label="Automatic updates" isDisabled>Obligatoria</Switch>
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Button
                            isIconOnly
                            aria-label="Like"
                            color="primary"
                            size="sm"
                            radius="full"
                            variant="light"
                        >
                            <MoreOutlined style={{ fontSize: '20px', color: '#08c' }} />
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Dropdown menu with icons" variant="faded">
                        <DropdownItem
                            key="new"
                            shortcut="⌘P"
                            startContent={<QuestionOutlined />}
                        >
                            Condicion
                        </DropdownItem>
                        <DropdownItem
                            key="copy"
                            shortcut="⌘S"
                            startContent={<PicCenterOutlined />}
                        >
                            Seccion
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </footer>
        </Card>
    );
};

export default CardEditable;
