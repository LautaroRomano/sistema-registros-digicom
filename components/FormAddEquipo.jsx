import React, { useEffect, useState } from "react";
import { Flex, Text, Input, Select, Textarea, Button } from "@chakra-ui/react";
import axios from "axios";


const FormAddEquipo = ({ data, setData, postEquipo, equiposConfig }) => {
  const inputsKey = equiposConfig
  const [step, setStep] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handlePostData = () => {
    postEquipo();
  };

  if (step === 1 && data.tipo_equipo === "1") {
    return (
      <FormAddEquipoTelcecs
        data={data}
        handleChangeMain={handleChange}
        handlePostData={handlePostData}
        setStep={setStep}
      />
    );
  }
  if (step === 1 && (data.tipo_equipo === "2" || data.tipo_equipo === "3")) {
    return (
      <FormAddEquipoSeccionador
        data={data}
        handleChangeMain={handleChange}
        handlePostData={handlePostData}
        setStep={setStep}
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
        overflowY="scroll"
      >
        <Text fontWeight={"700"} my="15px">
          NUEVO EQUIPO
        </Text>

      </Flex>
      <Flex w={"70%"} mt="15px" justifyContent={"end"}>
        <Button me={"15px"} colorScheme="orange" onClick={() => setData(false)}>
          Cancelar
        </Button>

        <Button colorScheme="blue" onClick={handlePostData}>
          Guardar
        </Button>
      </Flex>
    </Flex>
  );
};

export default FormAddEquipo;
