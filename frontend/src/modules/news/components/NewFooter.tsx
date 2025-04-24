import SVG_Bookmark from "@/assets/icons/bookmark";
import SVG_Comment from "@/assets/icons/comment";
import SVG_Like from "@/assets/icons/like";
import SVG_Reload from "@/assets/icons/realo";
import SVG_Share from "@/assets/icons/share";
import { Button } from "@heroui/react";
import { Flex } from "antd";

const NewFooter = () => {
  return (
    <Flex gap={20} align="center" justify="space-between" className="w-full">
      <PrimaryOptions />
      <SecondaryOptions />
    </Flex>
  );
};

const PrimaryOptions = () => {
  return (
    <Flex>
      <Button color="primary" size="md" radius="full" variant="light">
        <SVG_Like />
        12
      </Button>

      <Button color="primary" size="md" radius="full" variant="light">
        <SVG_Comment /> 12
      </Button>

      <Button color="primary" size="md" radius="full" variant="light">
        <SVG_Reload />
        12
      </Button>
    </Flex>
  );
};


const SecondaryOptions = () => {
    return (
        <Flex gap={0}>
        <Button color="primary" size="md" radius="full" variant="light" isIconOnly>
            <SVG_Bookmark />
        </Button>
    
        <Button color="primary" size="md" radius="full" variant="light" isIconOnly>
            <SVG_Share />
        </Button>
        </Flex>
    );
}
export default NewFooter;
