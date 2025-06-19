import { type PropsWithChildren } from "react";

const FullSize: React.FC<PropsWithChildren> = ({ children }) => {
    return <div className="h-screen w-screen">{children}<footer>Made with ❤️</footer></div>;
};

export default FullSize;