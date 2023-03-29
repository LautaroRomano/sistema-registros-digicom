import React, { useEffect, useState } from "react";
import { Flex, Text, Input, Select, Textarea, Button } from "@chakra-ui/react";
import ViewDetallesServicios from "./ViewDetallesServicios";
import SelectR from "react-select";

const TIPOS_FALLAS = [
  "ALARMA",
  "MALA COMUNICACION",
  "SIN COMUNICACION",
  "SIN LECTURA",
  "OTROS",
];

const FormAddService = ({
  data,
  setData,
  postServicio,
  nombreEquipos,
  fallasDatos,
  validarDatos,
  detallesServicios,
  getDetallesServicios,
}) => {
  const [step, setStep] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const [newDetalle, setNewDetalle] = useState(false);

  const handlePostData = () => {
    postServicio();
  };

  useEffect(() => {
    if (validarDatos.length > 0 && !validarDatos[0].value) {
      setStep(0);
    }
  }, [validarDatos]);

  if (step === 1) {
    return (
      <FormAddFalla
        data={data}
        setData={setData}
        setStep={setStep}
        handlePostData={handlePostData}
        fallasDatos={fallasDatos}
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
      {newDetalle && (
        <ViewDetallesServicios
          setData={setNewDetalle}
          get={getDetallesServicios}
        />
      )}
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
              <SelectR
                name="equipo"
                onChange={({ value }) => {
                  handleChange({
                    target: { name: "equipo", value: value },
                  });
                }}
                options={
                  Array.isArray(nombreEquipos)
                    ? nombreEquipos.map((nom) => {
                        return {
                          value: nom.id_equipo+'',
                          label: nom.nombreTelgecs
                            ? nom.nombreTelgecs
                            : nom.nombreSeccionador
                            ? nom.nombreSeccionador
                            : nom.nombreReconectador
                            ? nom.nombreReconectador
                            : "-",
                        };
                      })
                    : []
                }
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    width: "25vw",
                  }),
                }}
              />
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
                <option value="0">Preventivo</option>
                <option value="1">Correctivo</option>
              </Select>
            </Flex>
            <Flex
              w={"100%"}
              h="50px"
              bg={"white"}
              alignItems="center"
              justifyContent={"space-between"}
            >
              <Text w={"100px"} m="10px" fontWeight={"600"}>
                Servicio
              </Text>
              <Select
                name="servicio"
                onChange={handleChange}
                value={data.servicio}
              >
                <option value={0}>...</option>
                {Array.isArray(detallesServicios) &&
                  detallesServicios.map((nom) => {
                    return (
                      <option
                        value={nom.id_servicio_detalle}
                        key={nom.id_servicio_detalle}
                      >
                        {nom.detalle}
                      </option>
                    );
                  })}
              </Select>
              <Flex
                onClick={() => setNewDetalle(true)}
                minW="25px"
                minH={"25px"}
                bg="blue.400"
                borderRadius={"50%"}
                fontWeight="600"
                fontSize={"19px"}
                color={"#fff"}
                cursor={"pointer"}
                position="relative"
                margin={"0 5px"}
              >
                <Text position={"absolute"} left="5px" top={"-3px"}>
                  +
                </Text>
              </Flex>
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
            {fallasDatos.length > 0 && !fallasDatos[0].value && (
              <Text
                w={"200px"}
                m="3px"
                fontWeight={"400"}
                color="red"
                fontSize={12}
              >
                *{fallasDatos[0].error}
              </Text>
            )}
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
                placeholder="Sin observaciones."
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
            Guardar
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

const FormAddFalla = ({
  data,
  setData,
  setStep,
  handlePostData,
  fallasDatos,
}) => {
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
          NUEVA CORRECCION
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
                {TIPOS_FALLAS.map((falla, i) => (
                  <option value={i} key={i}>
                    {falla}
                  </option>
                ))}
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
                placeholder="Sin detalle."
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
                placeholder="Sin observaciones."
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
            {fallasDatos.length > 0 && !fallasDatos[1].value && (
              <Text
                w={"200px"}
                m="3px"
                fontWeight={"400"}
                color="red"
                fontSize={12}
              >
                *{fallasDatos[1].error}
              </Text>
            )}
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
                placeholder="Sin detalle."
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
          Guardar
        </Button>
      </Flex>
    </Flex>
  );
};

export default FormAddService;
