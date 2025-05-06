import { Flex } from "antd";
import LayoutAccount from "@/layouts/account";
import Header from "@/components/form/header/header";
import Profile from "./profile";
import Suggest from "./suggest";

const Account: React.FC = () => {

    return (
        <LayoutAccount>
            <Header />
            <Flex
            vertical
            gap={20}
                align="center"
                style={{
                    backgroundColor: "rgb(222,209,255)",
                    background:
                        "radial-gradient(circle, rgba(222,209,255,1) 0%, rgba(218,255,252,1) 100%)",
                    paddingBottom: "20px",
                    minHeight: "100vh",
                    paddingTop: "20px",
                }}
            >

                <Profile/>
                <Suggest/>
            </Flex>
        </LayoutAccount>
    );
};

export default Account;
