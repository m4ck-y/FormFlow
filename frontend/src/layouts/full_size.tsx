import { PropsWithChildren } from "react";

const FullSize: React.FC<PropsWithChildren> = ({ children }) => {
    return <div className="h-screen w-screen">{children}</div>;
};

export default FullSize;