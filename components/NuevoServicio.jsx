import { useEffect, useState } from "react";
import { Flex, Text, Button } from "@chakra-ui/react";
import SelectR from "react-select";
import axios from "axios";

export default function NuevoServicio({
  setNewService,
  config,
  equipo,
  newServiceData,
  handleChange,
}) {
  const [viewConfig, setViewConfig] = useState(false);

  return (
    <Flex
      w={"100vw"}
      h="100vh"
      justifyContent={"center"}
      alignItems="center"
      flexDir={"column"}
    >
      <Text>Nuevo servicio para el equipo: {equipo}</Text>
    </Flex>
  );
}
