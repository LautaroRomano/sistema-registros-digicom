import { Flex, Input, Button, Text, Select } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";

const UpdateRowEquipo = ({ data, keyData, setUpdateRow, getEquipos }) => {
  const [newData, setNewData] = useState(data[keyData]);
  const [administracionesList, setAdministracionesList] = useState([]);
  const [sucursalesList, setSucursalesList] = useState([]);
  const [localidadesList, setLocalidadesList] = useState([]);

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
      setNewData({
        administracion: data.administracion,
        sucursal: data.sucursal,
        localidad: data.localidad,
      });
      axios.get("/api/administraciones").then(({ data }) => {
        setAdministracionesList(data);
      });
    }
    if (keyData === "fecha_cambio_bateria") setUpdateRow(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData({ ...newData, [name]: value });

    if (name === "administracion") {
      axios.get("/api/sucursales/" + value).then(({ data }) => {
        setSucursalesList(data);
      });
      setLocalidadesList([]);
    }

    if (name === "sucursal")
      axios.get("/api/localidades/" + e.target.value).then(({ data }) => {
        setLocalidadesList(data);
      });
  };

  if (keyData === "fecha_cambio_bateria") return <></>;

  if (
    keyData === "sucursal" ||
    keyData === "localidad" ||
    keyData === "administracion"
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
            Editar
          </Text>
          <Flex
            w={"100%"}
            bg={"white"}
            alignItems="center"
            justifyContent={"space-between"}
          >
            <Text w={"150px"} m="10px" fontWeight={"600"} fontSize="13px">
              Administracion:
            </Text>
            <Select
              name={"administracion"}
              onChange={handleChange}
              value={newData.administracion}
              size={"sm"}
            >
              <option value={"-1"}>...</option>
              {administracionesList.map((elem, i) => (
                <option value={elem.id_administracion} key={i}>
                  {elem.nombre}
                </option>
              ))}
            </Select>
          </Flex>

          <Flex
            w={"100%"}
            bg={"white"}
            alignItems="center"
            justifyContent={"space-between"}
          >
            <Text w={"150px"} m="10px" fontWeight={"600"} fontSize="13px">
              sucursal:
            </Text>
            <Select
              name={"sucursal"}
              onChange={handleChange}
              value={newData.sucursal}
              size={"sm"}
            >
              <option value={"-1"}>...</option>
              {sucursalesList.map((elem, i) => (
                <option value={elem.id_sucursal} key={i}>
                  {elem.nombre}
                </option>
              ))}
            </Select>
          </Flex>

          <Flex
            w={"100%"}
            bg={"white"}
            alignItems="center"
            justifyContent={"space-between"}
          >
            <Text w={"150px"} m="10px" fontWeight={"600"} fontSize="13px">
              localidad:
            </Text>
            <Select
              name={"localidad"}
              onChange={handleChange}
              value={newData.localidad}
              size={"sm"}
            >
              <option value={"-1"}>...</option>
              {localidadesList.map((elem, i) => (
                <option value={elem.id_localidad} key={i}>
                  {elem.nombre}
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
          >
            Cancelar
          </Button>
          <Button
            my={"5px"}
            mx="15px"
            colorScheme={"blue"}
            onClick={handleGuardar}
          >
            Guardar
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default UpdateRowEquipo;
