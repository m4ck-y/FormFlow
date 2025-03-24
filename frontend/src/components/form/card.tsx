import { Card as HCard, CardBody } from "@heroui/react";

import { PropsWithChildren } from "react";

const Card: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <HCard
            className="max-w-[400px]"
            style={{
                maxWidth: "600px",
                marginTop: "20px",
                minWidth: "300px",
                width: "100%",
                padding:"10px"
            }}
        >
            <CardBody>{children}</CardBody>
        </HCard>
    );
};

export default Card;
