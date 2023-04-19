import { useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import CloseIcon from "@mui/icons-material/Close";
import ViewColumns from "./viewColumns/ViewColumns";

const ViewConfig = ({ handleChangeViewConfig }) => {
  const [viewColumns, setViewColumns] = useState(null);

  const handleChangeViewColumns = () => setViewColumns((state) => !state);

  if (viewColumns)
    return <ViewColumns handleChangeView={handleChangeViewColumns} />;

  return (
    <Flex
      w={"500px"}
      h={"100vh"}
      position={"fixed"}
      top={"0"}
      right={"0"}
      zIndex={100}
      boxShadow={"2xl"}
      bgGradient={"linear(to-l, #162b4e, #102a4e)"}
      p={"30px"}
      color={"#FFF"}
    >
      <Text
        pos="absolute"
        right="5"
        top="5"
        _hover={{ cursor: "pointer", bg: "#00001a" }}
        borderRadius={"35%"}
        p={"5px"}
        onClick={handleChangeViewConfig}
        w={"35px"}
        h={"35px"}
      >
        <CloseIcon style={{ width: "100%", height: "100%" }} />
      </Text>
      <Flex
        mt={"70px"}
        alignItems={"center"}
        h={"40px"}
        w={"100%"}
        _hover={{ cursor: "pointer", bg: "#00001a" }}
      >
        <Text
          fontSize={"16px"}
          fontWeight={"bold"}
          px={"10px"}
          py={"25px"}
          onClick={() => setViewColumns(1)}
        >
          Equipos telgecs datos
        </Text>
      </Flex>
    </Flex>
  );
};

export default ViewConfig;
