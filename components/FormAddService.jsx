import React, { useState } from "react";
import { Flex, Text, Input, Select, Textarea, Button } from "@chakra-ui/react";

const FormAddService = ({ data, setData, postServicio, nombreEquipos }) => {
  const [step, setStep] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handlePostData = () => {
    postServicio();
  };

  if (step === 1) {
    return (
      <FormAddFalla
        data={data}
        setData={setData}
        setStep={setStep}
        handlePostData={handlePostData}
      />
    );
  }

  return (
    <Flex
      w={"100vw"}
      h="100vh"
      bg={"#0009"}
      justifyContent="center"
      alignItems={"center"}
      position="fixed"
      top={0}
      left="0"
      zIndex={10}
      flexDir="column"
    >
      <Flex
        w={"70%"}
        height="80%"
        bg={"white"}
        borderRadius="2xl"
        alignItems="center"
        flexDir={"column"}
      >
        <Text fontWeight={"700"} my="15px">
          NUEVO SERVICIO
        </Text>
        <Flex w={"100%"} h="100%">
          <Flex w={"50%"} h="100%" flexDir="column" p={"10px"}>
            <Flex
              w={"100%"}
              h="50px"
              bg={"white"}
              alignItems="center"
              justifyContent={"space-between"}
            >
              <Text w={"100px"} m="10px" fontWeight={"600"}>
                Equipos
              </Text>
              <Select name="equipo" onChange={handleChange} value={data.equipo}>
                {nombreEquipos.map((nom) => {
                  return (
                    <option value={nom.id_equipo} key={nom.id_equipo}>
                      {nom.nombre}
                    </option>
                  );
                })}
              </Select>
            </Flex>
            <Flex
              w={"100%"}
              h="50px"
              bg={"white"}
              alignItems="center"
              justifyContent={"space-between"}
              mt={"25px"}
            >
              <Text w={"100px"} m="10px" fontWeight={"600"}>
                Tipo de servicio
              </Text>
              <Select
                name="tipoServicio"
                onChange={handleChange}
                value={data.tipoServicio}
              >
                <option value="-1">Todos los tipos de servicios</option>
                <option value="0">Preventivo</option>
                <option value="1">Correctivo</option>
              </Select>
            </Flex>
          </Flex>
          <Flex w={"50%"} h="100%" flexDir="column" p={"10px"}>
            <Flex
              w={"100%"}
              h="50px"
              bg={"white"}
              alignItems="center"
              justifyContent={"space-between"}
            >
              <Text w={"150px"} m="10px" fontWeight={"600"}>
                Fecha
              </Text>
              <Input
                type={"date"}
                name="fechaServicio"
                onChange={handleChange}
                value={data.fechaServicio}
              />
            </Flex>
            <Flex
              w={"100%"}
              h="50px"
              bg={"white"}
              alignItems="center"
              mt={"35px"}
              justifyContent={"space-between"}
            >
              <Text w={"120px"} m="10px" fontWeight={"600"}>
                Observaciones
              </Text>
              <Textarea
                name="observacionesServicio"
                onChange={handleChange}
                value={data.observacionesServicio}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex w={"70%"} mt="15px" justifyContent={"end"}>
        <Button me={"15px"} colorScheme="orange" onClick={() => setData(false)}>
          Cancelar
        </Button>
        {data.tipoServicio == "1" ? (
          <Button colorScheme="blue" onClick={() => setStep((i) => i + 1)}>
            Continuar
          </Button>
        ) : (
          <Button colorScheme="blue" onClick={handlePostData}>
            Finalizar
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

const FormAddFalla = ({ data, setData, setStep, handlePostData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <Flex
      w={"100vw"}
      h="100vh"
      bg={"#0006"}
      justifyContent="center"
      alignItems={"center"}
      position="fixed"
      top={0}
      left="0"
      zIndex={10}
      flexDir="column"
    >
      <Flex
        w={"70%"}
        height="80%"
        bg={"white"}
        borderRadius="2xl"
        alignItems="center"
        flexDir={"column"}
      >
        <Text fontWeight={"700"} my="15px">
          Correccion
        </Text>
        <Flex w={"100%"} h="100%">
          <Flex w={"50%"} h="100%" flexDir="column" p={"10px"}>
            <Flex
              w={"100%"}
              h="50px"
              bg={"white"}
              alignItems="center"
              justifyContent={"space-between"}
            >
              <Text w={"170px"} m="10px" fontWeight={"600"}>
                Tipo falla
              </Text>
              <Select
                value={data.tipoFalla}
                name="tipoFalla"
                onChange={handleChange}
              >
                <option value="-1">Todos los tipos de falla</option>
                <option value="0">Cable coaxil</option>
                <option value="1">Seccionador</option>
                <option value="2">Reconectador</option>
              </Select>
            </Flex>
            <Flex
              w={"100%"}
              h="50px"
              bg={"white"}
              alignItems="center"
              mt={"25px"}
              justifyContent={"space-between"}
            >
              <Text w={"170px"} m="10px" fontWeight={"600"}>
                Detalle de falla
              </Text>
              <Textarea
                value={data.detalleFalla}
                name="detalleFalla"
                onChange={handleChange}
              />
            </Flex>
            <Flex
              w={"100%"}
              h="50px"
              bg={"white"}
              alignItems="center"
              justifyContent={"space-between"}
              mt={"45px"}
            >
              <Text w={"170px"} m="10px" fontWeight={"600"}>
                Observaciones
              </Text>
              <Textarea
                value={data.observacionesFalla}
                name="observacionesFalla"
                onChange={handleChange}
              />
            </Flex>
          </Flex>
          <Flex w={"50%"} h="100%" flexDir="column" p={"10px"}>
            <Flex
              w={"100%"}
              h="50px"
              bg={"white"}
              alignItems="center"
              justifyContent={"space-between"}
            >
              <Text w={"170px"} m="10px" fontWeight={"600"}>
                Fecha solucion
              </Text>
              <Input
                type={"date"}
                name="fechaSolucion"
                onChange={handleChange}
                value={data.fechaSolucion}
              />
            </Flex>
            <Flex
              w={"100%"}
              h="50px"
              bg={"white"}
              alignItems="center"
              mt={"35px"}
              justifyContent={"space-between"}
            >
              <Text w={"170px"} m="10px" fontWeight={"600"}>
                Detalle solucion
              </Text>
              <Textarea
                name="detalleSolucion"
                onChange={handleChange}
                value={data.detalleSolucion}
              />
            </Flex>

            <Flex
              w={"100%"}
              h="50px"
              bg={"white"}
              alignItems="center"
              justifyContent={"space-between"}
              mt={"35px"}
            >
              <Text w={"170px"} m="10px" fontWeight={"600"}>
                Solucionado
              </Text>
              <Select
                value={data.solucionado}
                name="solucionado"
                onChange={handleChange}
              >
                <option value="0">No</option>
                <option value="1">Si</option>
              </Select>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex w={"70%"} mt="15px" justifyContent={"end"}>
        <Button me={"15px"} colorScheme="orange" onClick={() => setData(false)}>
          Cancelar
        </Button>
        <Button
          me={"15px"}
          colorScheme="orange"
          onClick={() => setStep((i) => i - 1)}
        >
          Atras
        </Button>
        <Button colorScheme="blue" onClick={handlePostData}>
          Finalizar
        </Button>
      </Flex>
    </Flex>
  );
};

export default FormAddService;
