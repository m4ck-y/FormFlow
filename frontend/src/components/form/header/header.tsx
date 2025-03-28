import {
    
    Input,
} from "@heroui/react";
import HeaderBase from "@/components/form/header/header_base";
import SVG_Search from "@/assets/icons/search";

const Header: React.FC = () => {
    return (
        <HeaderBase
        center={
        <Input
        radius="full"
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Búsqueda"
          size="sm"
          startContent={<SVG_Search />}
          type="search"
        />
        }/>
    )
}

export default Header;