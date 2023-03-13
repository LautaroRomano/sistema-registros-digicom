import React, { useEffect, useState } from "react";
import { Flex, Text, Input, Select, Textarea, Button } from "@chakra-ui/react";
import axios from "axios";

const TIPOS_FALLAS = [
  "ALARMA",
  "MALA COMUNICACION",
  "SIN COMUNICACION",
  "SIN LECTURA",
  "OTROS",
];

const INPUTS_CONFIG = {
  nro_set: {
    dataType: "text",
    placeholder: "Ingresa la SET",
    text: "SET: ",
  },
  codigo_caja: {
    dataType: "text",
    placeholder: "Ingresa el codigo de la caja",
    text: "Codigo caja: ",
  },
  configuracion: {
    dataType: "text",
    placeholder: "Ingresa la configuracion del equipo",
    text: "Configuracion: ",
  },
  t_m: {
    dataType: "text",
    placeholder: "",
    text: "Trifasico/Monofasico: ",
    type: "select",
  },
  numero_serie_medidor: {
    dataType: "text",
    placeholder: "Ingresa el numero de serie del medidor",
    text: "Nro. serie medidor: ",
  },
  id_modbus: {
    dataType: "number",
    placeholder: "Ingresa ID modbus",
    text: "ID modbus: ",
  },
  placa_radio_modem: {
    dataType: "text",
    placeholder: "Ingresa la placa del radio modem",
    text: "Placa radio modem: ",
  },
  programa_radio_modem: {
    dataType: "text",
    placeholder: "Ingresa el programa radio modem",
    text: "Programa radio modem: ",
  },
  radio_modem_protegido: {
    dataType: "text",
    placeholder: "Ingresa radio modem protegido",
    text: "Radio modem protegido: ",
  },
  capacidad_rtu: {
    dataType: "text",
    placeholder: "Ingresa la capacidad RTU",
    text: "Capacidad RTU: ",
  },
};

const inputsKey = Object.keys(INPUTS_CONFIG);

const FormAddEquipoTelcecs = ({
  data,
  handleChangeMain,
  handlePostData,
  setStep,
}) => {
  const [equipoTelgecsData, setEquipoTelgecsData] = useState(
    data.equipo_telgecs
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEquipoTelgecsData((data) => ({ ...data, [name]: value }));
  };

  useEffect(() => {
    if (handleChangeMain)
      handleChangeMain({
        target: { name: "equipo_telgecs", value: equipoTelgecsData },
      });
  }, [equipoTelgecsData]);

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
        overflowY="scroll"
      >
        <Text fontWeight={"700"} my="15px">
          NUEVO EQUIPO TELGECS
        </Text>
        <Flex w={"100%"} h="100%">
          {/* contiene los inputsBox izquierdos*/}
          <Flex w={"50%"} h="100%" flexDir="column" p={"10px"}>
            {inputsKey
              .map((key, i) => {
                if (
                  i <= (inputsKey.length - 1) / 2 &&
                  INPUTS_CONFIG[key].type === "select"
                )
                  return (
                    <Flex
                      w={"100%"}
                      bg={"white"}
                      alignItems="center"
                      justifyContent={"space-between"}
                      key={key}
                    >
                      <Text
                        w={"150px"}
                        m="10px"
                        fontWeight={"600"}
                        fontSize="13px"
                      >
                        {INPUTS_CONFIG[key].text}
                      </Text>
                      <Select
                        type={INPUTS_CONFIG[key].dataType}
                        name={key}
                        onChange={handleChange}
                        value={data.equipo_telgecs[key]}
                        placeholder={INPUTS_CONFIG[key].placeholder}
                        size={"sm"}
                      >
                        <option value={"TRIFASICO"} key={0}>
                          {"TRIFASICO"}
                        </option>
                        <option value={"MONOFASICO"} key={1}>
                          {"MONOFASICO"}
                        </option>
                      </Select>
                    </Flex>
                  );
                if (i <= (inputsKey.length - 1) / 2)
                  return (
                    <Flex
                      w={"100%"}
                      bg={"white"}
                      alignItems="center"
                      justifyContent={"space-between"}
                      key={key}
                    >
                      <Text
                        w={"150px"}
                        m="10px"
                        fontWeight={"600"}
                        fontSize="13px"
                      >
                        {INPUTS_CONFIG[key].text}
                      </Text>
                      <Input
                        type={INPUTS_CONFIG[key].dataType}
                        name={key}
                        onChange={handleChange}
                        value={data.equipo_telgecs[key]}
                        placeholder={INPUTS_CONFIG[key].placeholder}
                        size={"sm"}
                      />
                    </Flex>
                  );
              })
              .filter((f) => f !== undefined)}
          </Flex>
          {/* contiene los inputsBox derechos*/}
          <Flex w={"50%"} h="100%" flexDir="column" p={"10px"}>
            {inputsKey
              .map((key, i) => {
                if (
                  i > (inputsKey.length - 1) / 2 &&
                  INPUTS_CONFIG[key].type === "select"
                )
                  return (
                    <Flex
                      w={"100%"}
                      bg={"white"}
                      alignItems="center"
                      justifyContent={"space-between"}
                      key={key}
                    >
                      <Text
                        w={"150px"}
                        m="10px"
                        fontWeight={"600"}
                        fontSize="13px"
                      >
                        {INPUTS_CONFIG[key].text}
                      </Text>
                      <Select
                        type={INPUTS_CONFIG[key].dataType}
                        name={key}
                        onChange={handleChange}
                        value={data.equipo_telgecs[key]}
                        placeholder={INPUTS_CONFIG[key].placeholder}
                        size={"sm"}
                      >
                        <option value={"1"} key={0}>
                          {"TRIFASICO"}
                        </option>
                        <option value={"2"} key={1}>
                          {"MONOFASICO"}
                        </option>
                      </Select>
                    </Flex>
                  );
                if (i > (inputsKey.length - 1) / 2)
                  return (
                    <Flex
                      w={"100%"}
                      bg={"white"}
                      alignItems="center"
                      justifyContent={"space-between"}
                      key={key}
                    >
                      <Text
                        w={"150px"}
                        m="10px"
                        fontWeight={"600"}
                        fontSize="13px"
                      >
                        {INPUTS_CONFIG[key].text}
                      </Text>
                      <Input
                        type={INPUTS_CONFIG[key].dataType}
                        name={key}
                        onChange={handleChange}
                        value={data.equipo_telgecs[key]}
                        placeholder={INPUTS_CONFIG[key].placeholder}
                        size={"sm"}
                      />
                    </Flex>
                  );
              })
              .filter((f) => f !== undefined)}
          </Flex>
        </Flex>
      </Flex>
      <Flex w={"70%"} mt="15px" justifyContent={"end"}>
        <Button
          me={"15px"}
          colorScheme="orange"
          onClick={() => setStep((i) => i - 1)}
        >
          Volver
        </Button>
        <Button colorScheme="blue" onClick={handlePostData}>
          Guardar
        </Button>
      </Flex>
    </Flex>
  );
};

export default FormAddEquipoTelcecs;
