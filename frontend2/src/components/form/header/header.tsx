import {
  Button,
  Input,
} from "@heroui/react";
import HeaderBase from "@/components/form/header/header_base";
import SVG_Search from "@/assets/icons/search";
import SVG_New from "@/assets/icons/new";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/routes/AppRoutes";

const Header: React.FC = () => {

  const navigate = useNavigate();

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
      }
      end={
        <>
        <Button isIconOnly radius="full" color="secondary" variant="light" onPress={() => navigate(ROUTES.NEWS)}>
          <SVG_New />
        </Button>
        </>
      }
    />
  )
}

export default Header;