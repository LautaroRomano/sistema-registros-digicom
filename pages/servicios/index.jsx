import React, { useEffect, useState } from "react";
import { Flex, Text, Select, Button, Input } from "@chakra-ui/react";
import axios from "axios";
import ViewUltimaVisita from "../../components/ViewUltimaVisita";
import Table from "../../components/tables/ServiciosTable";
import UpdateRow from "../../components/UpdateRowEquipo";
import Navbar from "../../components/Navbar";

const ViewServicios = () => {
  const [filter, setFilter] = useState({ nombre: "" });
  const [newEquipo, setNewEquipo] = useState(false);
  const [servicios, setEquipos] = useState([]);
  const [config, setConfig] = useState([]);
  const [updateRow, setUpdateRow] = useState(false);
  const [viewUltimaVisita, setViewUltimaVisita] = useState(false);
  const [pageSize] = useState(15);
  const [page, setPage] = useState(0);
  const [newEquipoData, setNewEquipoData] = useState({});

  const handleChangeData = ({ target }) => {
    setNewEquipoData((state) => ({ ...state, [target.name]: target.value }));
  };

  useEffect(() => {
    get();
  }, []);

  const get = () => {
    axios.get(`/api/servicios`).then((res) => {
      setEquipos(res.data);
    });
    axios.get(`/api/getconfig`).then((res) => {
      setConfig(res.data);
    });
  };

  return (
    <>
      {updateRow && (
        <UpdateRow
          data={updateRow.data}
          keyData={updateRow.keyData}
          setUpdateRow={setUpdateRow}
          get={() => {
            get();
          }}
        />
      )}
      {viewUltimaVisita && (
        <ViewUltimaVisita
          data={[]}
          setData={setViewUltimaVisita}
          equipo={viewUltimaVisita.equipo}
          getUltVisita={getUltVisita}
        />
      )}
      {!updateRow && (
        <Flex
          w={"100vw"}
          h={"100vh"}
          justifyContent={"center"}
          alignItems={"center"}
          position={"fixed"}
          top={"0"}
          left={"0"}
          bg={"#0001"}
          zIndex={100}
          color={"#262626"}
          flexDir={"column"}
        >
          <Navbar />
          <Flex
            w={"80%"}
            h={"80%"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDir="column"
            bg="#175796"
            borderRadius={"15px"}
            position={"relative"}
          >
            <Text fontSize={"1.5rem"} fontWeight={"600"} color={"#fff"}>
              Servicios
            </Text>
            <Flex
              my={"30px"}
              w={"80%"}
              h="120px"
              px={"1.5rem"}
              bg="#fff"
              justifyContent="start"
              alignItems={"center"}
              position="relative"
              borderRadius={"15px"}
            >
              <Flex
                position={"absolute"}
                top={-5}
                left="0"
                p="10px"
                bg={"#fff"}
                borderTopRadius="15px"
                color={"#gray.200"}
                fontWeight="600"
              >
                <Text mt={"-10px"}>Filtrar</Text>
              </Flex>
              <Flex
                flexDir={"column"}
                alignItems={"center"}
                justifyContent="center"
              >
                <Flex
                  flexDir={"column"}
                  justifyContent={"center"}
                  ms={'25px'}
                  zIndex={'1000'}
                >
                  <Flex>
                    <Text fontWeight={'bold'} fontSize={'14px'}>Rango de fecha</Text>
                    <Flex borderRadius={'5px'} bg={'red'} minW={'35px'} minH={'14px'} ms={'5px'} color={'#fff'} fontSize={'10px'} justifyContent={'center'} align={'center'} cursor={'pointer'} _hover={{ opacity: .8 }} onClick={() => setFilter(state => ({ ...state, fechaDesde: null, fechaHasta: null }))}>borrar</Flex>
                  </Flex>
                  <Flex alignItems={'center'}>
                    <Text fontSize={'13px'} w={'40px'}>Desde: </Text>
                    <Input
                      value={filter.fechaDesde}
                      w="170px"
                      ms={"15px"}
                      my="3px"
                      onChange={(e) => {
                        setFilter({ ...filter, fechaDesde: e.target.value });
                      }}
                      type="datetime-local"
                      size={'sm'}
                    />
                  </Flex>
                  <Flex alignItems={'center'}>
                    <Text fontSize={'13px'} w={'40px'}>Hasta: </Text>
                    <Input
                      value={filter.fechaHasta}
                      w="170px"
                      ms={"15px"}
                      my="3px"
                      onChange={(e) => {
                        setFilter({ ...filter, fechaHasta: e.target.value });
                      }}
                      type="datetime-local"
                      size={'sm'}
                      min={filter.fechaDesde}
                    />
                  </Flex>
                </Flex>
              </Flex>
              <Flex
                flexDir={"column"}
                justifyContent={"center"}
                ms={'25px'}
                zIndex={'1000'}
              >
                <Flex alignItems={'center'} flexDir={'column'}>
                  <Text fontSize={'13px'} fontWeight={'bold'}>Tipo Problema: </Text>
                  <Input
                    value={filter.tipoProblema}
                    w="170px"
                    ms={"15px"}
                    my="3px"
                    onChange={(e) => {
                      setFilter({ ...filter, tipoProblema: e.target.value });
                    }}
                    size={'sm'}
                    min={filter.tipoProblema}
                  />
                </Flex>
              </Flex>
              <Flex
                flexDir={"column"}
                justifyContent={"center"}
                ms={'25px'}
                zIndex={'1000'}
              >
                <Flex alignItems={'center'} flexDir={'column'}>
                  <Text fontSize={'13px'} fontWeight={'bold'}>Solucionado: </Text>
                  <Select
                    value={filter.solucionado}
                    w="170px"
                    ms={"15px"}
                    my="3px"
                    onChange={(e) => {
                      setFilter({ ...filter, solucionado: e.target.value });
                    }}
                    size={'sm'}
                    min={filter.solucionado}
                  >
                    <option value={null}>-</option>
                    <option value="Si">Si</option>
                    <option value="No">No</option>
                  </Select>
                </Flex>
              </Flex>
            </Flex>

            <Flex
              border="none"
              w={"90%"}
              h="80%"
              position="relative"
              flexDir={"column"}
            >
              <Flex
                w={"100%"}
                h="95%"
                bg={"#fff"}
                borderBottomRadius="10px"
                p={"10px"}
                flexDir="column"
              >
                <Table
                  fields={servicios}
                  columns={config.serviciosData || []}
                  setUpdateRow={setUpdateRow}
                  tipo={1}
                  pageSize={pageSize}
                  page={page}
                  newEquipo={newEquipo}
                  handleChangeData={handleChangeData}
                  newEquipoData={newEquipoData}
                  filter={filter}
                />
                <Flex mt={"5px"} w="100%" justifyContent={"end"}>
                  <Flex
                    bg={"primary"}
                    w={"25px"}
                    h="25px"
                    borderRadius={"50%"}
                    color="#FFF"
                    textAlign="center"
                    justifyContent={"center"}
                    fontWeight={"550"}
                    cursor="pointer"
                    mx={"5px"}
                    onClick={() =>
                      setPage((page) => (page > 0 ? page - 1 : page))
                    }
                  >
                    {"<"}
                  </Flex>
                  <Flex bg={"#FFF"} h="30px">
                    Pagina: {page + 1} de{" "}
                    {Math.floor(servicios.length / pageSize) + 1}
                  </Flex>
                  <Flex
                    bg={"primary"}
                    w={"25px"}
                    h="25px"
                    borderRadius={"50%"}
                    color="#FFF"
                    textAlign="center"
                    justifyContent={"center"}
                    fontWeight={"550"}
                    cursor="pointer"
                    mx={"5px"}
                    onClick={() =>
                      setPage((page) =>
                        page + 1 < Math.floor(servicios.length / pageSize) + 1
                          ? page + 1
                          : page
                      )
                    }
                  >
                    {">"}
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default ViewServicios;

const compararCadenas = (cad1, cad2) => {
  if (!cad1) return false;
  if (!cad2) return false;
  return cad1.toLowerCase().includes(cad2.toLowerCase());
};
