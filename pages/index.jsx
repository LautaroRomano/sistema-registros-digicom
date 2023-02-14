import { useState } from "react";
import { Flex, Image } from "@chakra-ui/react";
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
      <Image
        width="209"
        height="55"
        src="https://digicom.net.ar/web/wp-content/uploads/2021/03/cropped-digicom-tucuman.fw_-1.png"
        class="custom-logo"
        alt=""
        loading="lazy"
        itemprop="logo"
      />

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
