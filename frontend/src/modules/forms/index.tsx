import React from "react";
import ListForm from "./list";
import { Button, Flex, FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import SearchCard from "../../components/search";

const ViewForm: React.FC = () => {
  return (
    <div>
      <Flex gap="small" vertical={false}>
        <SearchCard />
        <Button type="default" icon={<PlusOutlined />} color="cyan" variant="solid"/>
        <FloatButton
          icon={<PlusOutlined />}
          shape="circle"
          type="primary"
         />
      </Flex>
      <ListForm />
    </div>
  );
};

export default ViewForm;
