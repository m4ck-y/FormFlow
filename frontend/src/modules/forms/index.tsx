import React from "react";
import ListForm from "./list";
import { Button, Flex, FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import SearchCard from "../../components/search";
import { useNavigate } from "react-router-dom";

const ViewForm: React.FC = () => {

  const navigate = useNavigate();


  return (
    <div>
      <Flex gap="small" vertical={false}>
        <SearchCard />
        <Button type="default" icon={<PlusOutlined />} color="cyan" variant="solid"/>
        <FloatButton
          icon={<PlusOutlined />}
          shape="circle"
          type="primary"
          onClick={()=>navigate("/form/design")}
         />
      </Flex>
      <ListForm />
    </div>
  );
};

export default ViewForm;
