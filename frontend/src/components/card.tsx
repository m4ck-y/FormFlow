import { Card as HCard, CardBody } from "@heroui/react";

import { PropsWithChildren } from "react";
import styles from "@/components/card.module.css";

const Card: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <HCard
            className={styles.card}
        >
            <CardBody>{children}</CardBody>
        </HCard>
    );
};

export default Card;
