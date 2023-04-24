import React, { useEffect, useState } from "react";
import { Flex, Text, Select, Button, Input } from "@chakra-ui/react";
import axios from "axios";
import ViewUltimaVisita from "../../components/ViewUltimaVisita";
import Table from "../../components/tables/ServiciosTable";
import UpdateRow from "../../components/UpdateRowEquipo";
import Navbar from "../../components/Navbar";
import CloseIcon from "@mui/icons-material/Close";

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

  const post = () => {
    axios
      .post(`/api/servicios`, newEquipoData)
      .then((res) => {
        setNewEquipoData({});
        setNewEquipo(false);
        get();
      })
      .catch((err) => {});
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
