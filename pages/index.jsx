import { useState } from "react";
import { Flex } from "@chakra-ui/react";
import ViewEquipos from "../components/ViewEquipos";
import ViewServicios from "../components/ViewServicios";

export default function Home() {
  const [selected, setSelected] = useState(0);

  const handleChangeSelected = (value) => {
    setSelected(value);
  };

  return (
    <Flex
      w={"100vw"}
      h="100vh"
      justifyContent={"center"}
      alignItems="center"
      flexDir={"column"}
    >
      <Flex
        border="none"
        w={"90%"}
        h="90%"
        position="relative"
        flexDir={"column"}
      >
        <Flex w={"100%"} h="30px" bg={"#fff"} border="none" top="0" left={"0"}>
          <Flex
            bg={selected === 0 ? "primary" : "gray.200"}
            color={selected === 0 ? "#fff" : "gray.700"}
            px={"1rem"}
            borderTopRadius="15px"
            name="0"
            cursor={"pointer"}
            onClick={() => handleChangeSelected(0)}
          >
            Servicios
          </Flex>
          <Flex
            bg={selected === 1 ? "primary" : "gray.200"}
            color={selected === 1 ? "#fff" : "gray.700"}
            ms="1px"
            px={"1rem"}
            borderTopRadius="15px"
            name="1"
            cursor={"pointer"}
            onClick={() => handleChangeSelected(1)}
          >
            Equipos
          </Flex>
        </Flex>
        <Flex w={"100%"} h="100%" bg={"primary"} borderBottomRadius="10px">
          {selected === 0 ? <ViewServicios /> : <ViewEquipos />}
        </Flex>
      </Flex>
    </Flex>
  );
}
