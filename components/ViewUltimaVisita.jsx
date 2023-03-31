import { useState } from "react";
import axios from "axios";
import { Flex, Button, Input, Text } from "@chakra-ui/react";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const ViewUltimaVisita = ({ data, setData, getUltVisita, equipo }) => {
  const [newData, setNewData] = useState();

  const handleGuardar = () => {
    if (newData)
      axios
        .post("/api/ultimavisita/" + equipo.id_equipo, {
          fecha: newData,
        })
        .then(({ data }) => {
          getUltVisita(equipo.id_equipo);
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
        h="350px"
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
          Ultimas Visitas de equipo {equipo.nombre || equipo.nroSet}{" "}
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
            type={"date"}
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

        <Flex flexDir={"column"} overflowY={"scroll"} px="25px">
          {data &&
            data.map((dat, i) => (
              <Text key={i} fontWeight="bold" letterSpacing={"widest"}>
                {dat.fecha}
              </Text>
            ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ViewUltimaVisita;
