import { useState } from "react";
import axios from "axios";
import { Flex, Button, Input, Text } from "@chakra-ui/react";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const keys = [
  "equiposReconectador",
  "equiposCamaras",
  "equiposCMM",
  "equiposRebaje",
  "equiposSeccionador",
  "equiposTelgecs",
];
const tiposEquipos = [
  "RECONECTADOR",
  "CAMARA",
  "CMM",
  "REBAJE",
  "SECCIONADOR",
  "SET",
];

const ViewUltimaVisita = ({ data, setData,getEquipos }) => {
  const [newData, setNewData] = useState();

  const handleGuardar = () => {
    const index = tiposEquipos.findIndex(f=>f===data.tipoEquipo)
    const coleccion = keys[index]
    if (newData)
      axios
        .post("/api/ultimavisita/" + coleccion, {
          newfecha: newData,
          ...data,
        })
        .then(({ data }) => {
          if(getEquipos)getEquipos();
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
      top={0}
      left={0}
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
          Ultimas Visitas de equipo {data.nombre || data.nroSet}{" "}
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
            Array.isArray(data.ultima_visita) &&
            data.ultima_visita.map((fecha, i) => (
              <Text key={i} fontWeight="bold" letterSpacing={"widest"}>
                {fecha}
              </Text>
            ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ViewUltimaVisita;
