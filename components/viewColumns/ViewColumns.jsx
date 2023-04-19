import { Flex, Text } from "@chakra-ui/react";
import CloseIcon from "@mui/icons-material/Close";

const viewColumns = ({ handleChangeView }) => {
  return (
    <Flex
      w={"100vw"}
      h={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
      position={"fixed"}
      top={"0"}
      left={"0"}
      bg={'#0001'}
      zIndex={1000}
    >
      <Flex
        w={"80vw"}
        zIndex={1000}
        boxShadow={"2xl"}
        bgGradient={"linear(to-l, #162b4e, #102a4e)"}
        px={"40px"}
        py={"80px"}
        color={"#FFF"}
        position={"relative"}
      >
        <Text
          pos="absolute"
          right="5"
          top="5"
          _hover={{ cursor: "pointer", bg: "#00001a" }}
          borderRadius={"35%"}
          p={"5px"}
          onClick={handleChangeView}
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
          <Text fontSize={"16px"} fontWeight={"bold"} px={"10px"} py={"25px"}>
            Equipos telgecs datos
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default viewColumns;
