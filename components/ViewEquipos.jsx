import React, { useEffect, useState } from "react";
import { Flex, Text, Select, Button, Input } from "@chakra-ui/react";
import axios from "axios";
import ViewUltimaVisita from "./ViewUltimaVisita";
import Table from "./tables/EquiposTable";
import UpdateRow from "./UpdateRowEquipo";
import PDFButton from "../components/createpdf/PDFButton";
import ViewPDF from "../components/createpdf/ViewPDF";
import CloseIcon from "@mui/icons-material/Close";

const TIPOS_EQUIPOS = { 0: 'TELGECS', 1: 'SECCIONADOR', 2: 'RECONECTADOR' };

const ViewEquipos = ({ handleChangeView, tipoEquipo }) => {
  const [filter, setFilter] = useState({ nombre: "" });
  const [newEquipo, setNewEquipo] = useState(false);
  const [equipos, setEquipos] = useState([]);
  const [equiposConfig, setEquiposConfig] = useState([]);
  const [updateRow, setUpdateRow] = useState(false);
  const [viewUltimaVisita, setViewUltimaVisita] = useState(false);
  const [pageSize] = useState(30);
  const [page, setPage] = useState(0);
  const [newEquipoData, setNewEquipoData] = useState({})

  const handleChangeData = ({ target }) => {
    setNewEquipoData(state => ({ ...state, [target.name]: target.value }))
  }

  useEffect(() => {
    if (TIPOS_EQUIPOS[tipoEquipo] === 'TELGECS') {
      getEquiposTelgecs();
    }
  }, []);

  const getEquiposTelgecs = () => {
    axios.get(`/api/equipos`).then((res) => {
      setEquipos(res.data);
    })
    axios.get(`/api/getconfig`).then((res) => {
      setEquiposConfig(res.data.equiposTelgecsData);
    })
  }

  const postEquipo = () => {
    axios.post(`/api/equipos`, newEquipoData)
      .then((res) => {
        setNewEquipoData({})
        setNewEquipo(false)
        getEquiposTelgecs();
      })
      .catch((err) => { })
  }


  return (
    <>
      {updateRow && (
        <UpdateRow
          data={updateRow.data}
          keyData={updateRow.keyData}
          setUpdateRow={setUpdateRow}
          getEquipos={() => {
            getEquiposTelgecs();
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
          bg={'#0001'}
          zIndex={100}
          color={'#262626'}
        >
          <Flex w={"80%"} h={"80%"} justifyContent={"center"} alignItems={"center"} flexDir="column" bg="#175796" borderRadius={"15px"} position={'relative'}>
            <Text
              pos="absolute"
              right="5"
              top="5"
              _hover={{ cursor: "pointer", opacity: 0.7 }}
              borderRadius={"35%"}
              p={"5px"}
              onClick={handleChangeView}
              w={"35px"}
              h={"35px"}
              color={'#fff'}
            >
              <CloseIcon style={{ width: "100%", height: "100%" }} />
            </Text>
            <Flex
              my={"30px"}
              w={"80%"}
              h="100px"
              px={"1.5rem"}
              bg="#fff"
              justifyContent="center"
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
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Input
                    value={filter.nombre}
                    w="250px"
                    ms={"15px"}
                    my="3px"
                    onChange={(e) => {
                      setFilter({ ...filter, nombre: e.target.value });
                    }}
                    placeholder="Nombre equipo"
                  ></Input>
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
                h="85%"
                bg={"#fff"}
                borderBottomRadius="10px"
                p={"10px"}
                flexDir="column"
              >
                <Table
                  equiposList={equipos}
                  equiposConfig={equiposConfig}
                  setUpdateRow={setUpdateRow}
                  tipo={1}
                  pageSize={pageSize}
                  page={page}
                  newEquipo={newEquipo}
                  postEquipo={postEquipo}
                  handleChangeData={handleChangeData}
                  newEquipoData={newEquipoData}
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
                    onClick={() => setPage((page) => (page > 0 ? page - 1 : page))}
                  >
                    {"<"}
                  </Flex>
                  <Flex bg={"#FFF"} h="30px">
                    Pagina: {page + 1} de{" "}
                    {Math.floor(0)}
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
                        page + 1 <
                          Math.floor(0)
                          ? page + 1
                          : page
                      )
                    }
                  >
                    {">"}
                  </Flex>
                  <PDFButton></PDFButton>
                </Flex>
                <Flex w={'100%'} justifyContent={"end"} ms="15px">
                  <Flex me="15px">
                    {
                      newEquipo ?
                        <Flex>
                          <Button
                            colorScheme={"green"}
                            size="sm"
                            mx={"5px"}
                            onClick={postEquipo}
                          >
                            Guardar equipo
                          </Button>
                          <Button
                            colorScheme={"orange"}
                            size="sm"
                            mx={"5px"}
                            onClick={() => { setNewEquipo(false); setNewEquipoData({}); }}
                          >
                            Cancelar
                          </Button>
                        </Flex>
                        :
                        <Button
                          colorScheme={"blue"}
                          size="sm"
                          mb={"5px"}
                          onClick={() => setNewEquipo(true)}
                        >
                          Nuevo equipo
                        </Button>
                    }
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

export default ViewEquipos;

const compararCadenas = (cad1, cad2) => {
  if (!cad1) return false;
  if (!cad2) return false;
  return cad1.toLowerCase().includes(cad2.toLowerCase());
};
