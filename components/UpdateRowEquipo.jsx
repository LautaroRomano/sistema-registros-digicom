import { Flex, Input, Button, Text, Select } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";

const UpdateRowEquipo = ({ data, keyData, setUpdateRow, getEquipos }) => {
  const [newData, setNewData] = useState(data[keyData]);
  const [config, setConfig] = useState();

  const handleGuardar = () => {
    const collection = data.coleccion
    axios
      .put(`/api/equipos/${collection}`, {
        newData: newData,
        keyData: keyData,
        _id: data._id,
        tipo_equipo: 0,
      })
      .then(({ data }) => {
        setUpdateRow(false);
        getEquipos();
      });
  };

  useEffect(() => {
    if (
      keyData === "sucursal" ||
      keyData === "localidad" ||
      keyData === "administracion"
    ) {
      axios.get(`/api/getconfig`).then((res) => {
        setConfig(res.data);
        console.log('config:', res.data)
      });
    }
    if (keyData === "fecha_cambio_bateria" || keyData === "ultima_visita") setUpdateRow(false);
  }, []);

  if (keyData === "fecha_cambio_bateria" || keyData === "ultima_visita") return <></>;

  if (
    (keyData === "sucursal" ||
      keyData === "localidad" ||
      keyData === "administracion") && config
  )
    return (
      <Flex
        position={"fixed"}
        top={0}
        left={0}
        zIndex={1000}
        height={"100vh"}
        w="100vw"
        bg={"#0005"}
        alignItems="center"
        justifyContent="center"
      >
        <Flex
          w={"400px"}
          h="200px"
          bg={"#fff"}
          borderRadius="10px"
          flexDir={"column"}
          alignItems="center"
          justifyContent={"center"}
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
          >
            Editar
          </Text>
          <Flex
            w={"100%"}
            bg={"white"}
            alignItems="center"
            justifyContent={"space-between"}
          >
            <Text w={"150px"} m="10px" fontWeight={"600"} fontSize="13px">
              {keyData === "administracion"
                ? 'Administracion:'
                : keyData === "sucursal"
                  ? 'Sucursal:'
                  : 'Localidad: '}
            </Text>
            <Select
              name={"administracion"}
              value={newData}
              onChange={(e) => setNewData(e.target.value)}
              size={"sm"}
              my={'22px'}
            >
              <option value={"-1"}>...</option>
              {keyData === "administracion"
                ? config.administraciones.map((elem, i) => (
                  <option value={elem} key={i}>
                    {elem}
                  </option>
                ))
                : keyData === "sucursal"
                  ? config.sucursales.map((elem, i) => (
                    <option value={elem} key={i}>
                      {elem}
                    </option>
                  ))
                  : keyData === "localidad" && config.localidades.map((elem, i) => (
                    <option value={elem} key={i}>
                      {elem}
                    </option>
                  ))}
            </Select>
          </Flex>
          <Flex>
            <Button
              my={"5px"}
              mx="15px"
              colorScheme={"orange"}
              onClick={() => setUpdateRow(false)}
              size={'sm'}
            >
              Cancelar
            </Button>
            <Button
              my={"5px"}
              mx="15px"
              colorScheme={"blue"}
              onClick={handleGuardar}
              disabled={
                newData.sucursal && newData.localidad && newData.administracion
              }
              size={'sm'}
            >
              Guardar
            </Button>
          </Flex>
        </Flex>
      </Flex>
    );

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
        h="250px"
        bg={"#fff"}
        borderRadius="10px"
        flexDir={"column"}
        alignItems="center"
        justifyContent={"center"}
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
        >
          ACTUALIZAR DATO: {keyData}
        </Text>
        <Input
          type={keyData === "fecha_instalacion" ? "date" : "text"}
          value={newData}
          my={"25px"}
          w="70%"
          onChange={(e) => setNewData(e.target.value)}
        ></Input>
        <Flex>
          <Button
            my={"5px"}
            mx="15px"
            colorScheme={"orange"}
            onClick={() => setUpdateRow(false)}
            size={'sm'}
          >
            Cancelar
          </Button>
          <Button
            my={"5px"}
            mx="15px"
            colorScheme={"blue"}
            onClick={handleGuardar}
            size={'sm'}
          >
            Guardar
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default UpdateRowEquipo;
