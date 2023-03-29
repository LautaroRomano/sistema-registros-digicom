import { useState } from "react";
import axios from "axios";
import { Flex, Button, Input, Text } from "@chakra-ui/react";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const ViewDetallesServicios = ({ setData, get }) => {
  const [newData, setNewData] = useState();

  const handleGuardar = () => {
    if (newData)
      axios
        .post("/api/servicios/detalles", {
          detalle: newData,
        })
        .then(({ data }) => {
          get();
        });
  };

  return (
    <Flex
      position={"fixed"}
      zIndex="10"
      height={"100vh"}
      w="100vw"
      bg={"#0005"}
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        w={"400px"}
        h="150px"
        bg={"#fff"}
        borderRadius="10px"
        flexDir={"column"}
        alignItems="center"
        justifyContent={"start"}
        position="relative"
      >
        <Text
          bg={"#175796"}
          my={"5px"}
          fontSize="16px"
          fontWeight={"bold"}
          w="100%"
          color="#FFF"
          textAlign={"center"}
          py="10px"
          position={"relative"}
        >
          Nuevo servicio
          <Button
            colorScheme={"red"}
            onClick={() => setData(false)}
            position="absolute"
            right={"5"}
            top="5px"
            size="sm"
          >
            <AddCircleIcon style={{ transform: "rotate(45deg)" }} />
          </Button>
        </Text>
        <Flex alignItems={"center"}>
          <Input
            type={"text"}
            value={newData}
            my={"25px"}
            w="70%"
            onChange={(e) => setNewData(e.target.value)}
          ></Input>
          <Button
            my={"5px"}
            mx="15px"
            colorScheme={"blue"}
            onClick={handleGuardar}
            disabled={!newData}
          >
            <AddCircleIcon />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ViewDetallesServicios;
