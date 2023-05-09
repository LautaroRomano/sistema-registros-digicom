import { useEffect, useState } from "react";
import { Flex, Text, Button, Select, Input } from "@chakra-ui/react";
import SelectR from "react-select";
import axios from "axios";
import Swal from "sweetalert2";

export default function NuevoServicio({
  setNewService,
  config,
  getConfig,
  equipo,
  newServiceData,
  handleChange,
  postNewService,
  deleteTipoProblema
}) {

  const sendNuevoTipoDeProblema = () => {
    Swal.fire({
      title: "Ingresa el nuevo tipo de problema",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Guardar",
      showLoaderOnConfirm: true,
      preConfirm: (text) => {
        console.log("guardar", text);
        let configAux = config;
        configAux.tiposDeProblemas.push(text);
        console.log(configAux);
        axios
          .put("/api/getconfig", {
            _id: configAux._id,
            field: "tiposDeProblemas",
            newData: configAux.tiposDeProblemas,
          })
          .then(({ data }) => {
            console.log(data);
            getConfig();
          });
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Guardado correctamente`,
        });
      }
    });
  };

  return (
    <Flex
      w={"100vw"}
      h="100vh"
      justifyContent={"center"}
      alignItems="center"
      flexDir={"column"}
      mb={"150px"}
    >
      <Text my={"35px"} color={"#00468C"} fontWeight={"bold"} fontSize={"18px"}>
        Nuevo servicio para el equipo: {equipo}
      </Text>
      <Flex
        w={"60vw"}
        alignItems={"center"}
        bg={"#00468C"}
        p={"10px"}
        borderRadius={"10px"}
        color={"#fff"}
      >
        <Text minW={"180px"} fontSize={"17px"} fontWeight={"bold"} me={"10px"}>
          Tipo de servicio
        </Text>
        <Select
          color={"#252525"}
          bg={"#FFF"}
          name="tipoServicio"
          value={newServiceData.tipoServicio}
          onChange={handleChange}
        >
          <option value="PREVENTIVO">PREVENTIVO</option>
          <option value="CORRECTIVO">CORRECTIVO</option>
        </Select>
      </Flex>
      {
        newServiceData.tipoProblema && newServiceData.tipoProblema.length > 0 &&
        <Flex
          w={"60vw"}
          alignItems={"center"}
          bg={"#00468C"}
          p={"10px"}
          borderRadius={"10px"}
          color={"#fff"}
          mt={"15px"}
        >
          <Text>Tipos de problemas seleccionados: </Text>
          <Flex overflowX={'scroll'} w={'100%'}>
            {
              newServiceData.tipoProblema && newServiceData.tipoProblema.map((pro,i) => (
                <Flex mb={'2px'} align={'center'} mx={'2px'} key={i}>
                  <Text key={pro} bg={'#fff'} color={'#262626'} borderRadius={'15px 0 0 15px'} px={'4px'} py={'2px'}>{pro}</Text>
                  <Text onClick={() => deleteTipoProblema(pro)} bg={'#aaf'} color={'#262626'} borderRadius={'0 15px 15px 0'} px={'8px'} py={'5px'} fontSize={'12px'} fontWeight={'bold'} cursor={'pointer'}>X</Text>
                </Flex>
              ))
            }
          </Flex>
        </Flex>
      }
      <Flex
        w={"60vw"}
        alignItems={"center"}
        bg={"#00468C"}
        p={"10px"}
        borderRadius={"10px"}
        color={"#fff"}
        mt={"15px"}
      >
        <Text minW={"180px"} fontSize={"17px"} fontWeight={"bold"} me={"10px"}>
          Tipo de problema
        </Text>
        <Select
          color={"#252525"}
          bg={"#FFF"}
          name="tipoProblema"
          value={newServiceData.tipoProblema ? newServiceData.tipoProblema[0] : null}
          onChange={handleChange}
        >
          <option value={null}>Sin tipo de problema</option>
          {config.tiposDeProblemas.map((tp, i) => (
            <option value={tp} key={i}>
              {tp}
            </option>
          ))}
        </Select>
        <Flex
          bg={"#FFF"}
          borderRadius={"50%"}
          minW={"30px"}
          minH={"30px"}
          ms={"10px"}
          alignItems={"center"}
          justifyContent={"center"}
          cursor={"pointer"}
          _hover={{ opacity: 0.8 }}
        >
          <Text
            fontWeight={"bold"}
            fontSize={"20px"}
            color={"#00468C"}
            mt={"-3px"}
            onClick={sendNuevoTipoDeProblema}
          >
            +
          </Text>
        </Flex>
      </Flex>

      <Flex
        w={"60vw"}
        alignItems={"center"}
        bg={"#00468C"}
        p={"10px"}
        borderRadius={"10px"}
        color={"#fff"}
        mt={"15px"}
      >
        <Text minW={"180px"} fontSize={"17px"} fontWeight={"bold"} me={"10px"}>
          Origen del problema
        </Text>
        <Input
          placeholder="Origen"
          color={"#252525"}
          bg={"#FFF"}
          name="origenProblema"
          value={newServiceData.origenProblema}
          onChange={handleChange}
        ></Input>
      </Flex>

      <Flex
        w={"60vw"}
        alignItems={"center"}
        bg={"#00468C"}
        p={"10px"}
        borderRadius={"10px"}
        color={"#fff"}
        mt={"15px"}
      >
        <Text minW={"180px"} fontSize={"17px"} fontWeight={"bold"} me={"10px"}>
          Solucion
        </Text>
        <Input
          placeholder="Solucion"
          color={"#252525"}
          bg={"#FFF"}
          name="solucion"
          value={newServiceData.solucion}
          onChange={handleChange}
        ></Input>
      </Flex>

      <Flex
        w={"60vw"}
        alignItems={"center"}
        bg={"#00468C"}
        p={"10px"}
        borderRadius={"10px"}
        color={"#fff"}
        mt={"15px"}
      >
        <Text minW={"180px"} fontSize={"17px"} fontWeight={"bold"} me={"10px"}>
          Se soluciono
        </Text>
        <Select
          color={"#252525"}
          bg={"#FFF"}
          name="seSoluciono"
          value={newServiceData.seSoluciono}
          onChange={handleChange}
        >
          <option value="Si">Si</option>
          <option value="No">No</option>
        </Select>
      </Flex>

      <Flex
        w={"60vw"}
        alignItems={"center"}
        bg={"#00468C"}
        p={"10px"}
        borderRadius={"10px"}
        color={"#fff"}
        mt={"15px"}
      >
        <Text minW={"180px"} fontSize={"17px"} fontWeight={"bold"} me={"10px"}>
          Observaciones
        </Text>
        <Input
          placeholder="Observaciones"
          color={"#252525"}
          bg={"#FFF"}
          name="observaciones"
          value={newServiceData.observaciones}
          onChange={handleChange}
        ></Input>
      </Flex>
      <Flex w={"60%"} mt={"15px"} justifyContent={"end"}>
        {" "}
        <Button
          colorScheme="blue"
          onClick={() => {
            Swal.fire({
              title: "Quiere finalizar el servicio?",
              showCancelButton: true,
              confirmButtonText: "Finalizar",
              denyButtonText: `Volver`,
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire("Servicio finalizado!", "", "success");
                setNewService(false);
                postNewService();
              }
            });
          }}
        >
          Finalizar
        </Button>
      </Flex>
    </Flex>
  );
}
