import React, { useEffect, useState } from "react";
import { Flex, Text, Select, Button, Input } from "@chakra-ui/react";
import axios from "axios";
import FormAddEquipo from "./FormAddEquipo";
import ViewUltimaVisita from "./ViewUltimaVisita";
import Table from "./tables/EquiposTable";
import UpdateRow from "./UpdateRowEquipo";
import PDFButton from "../components/createpdf/PDFButton";
import ViewPDF from "../components/createpdf/ViewPDF";

const ViewEquipos = (props) => {
  const [filter, setFilter] = useState({
    nombre: "",
  });
  const [newEquipo, setNewEquipo] = useState(false);
  const [equiposTelgecs, setEquiposTelgecs] = useState([]);
  const [equiposSeccionador, setEquiposSeccionador] = useState([]);
  const [updateRow, setUpdateRow] = useState(false);
  const [tabSelected, setTabSelected] = useState(0);
  const [ultimasVisitas, setUltimasVisitas] = useState({});
  const [viewUltimaVisita, setViewUltimaVisita] = useState(false);
  const [cambiosDeBateria, setCambiosDeBateria] = useState(false);
  const [pageSize] = useState(30);
  const [page, setPage] = useState(0);
  const [serviciosFiltrados, setServiciosFiltrados] = useState({
    telgecs: [],
    seccionador: [],
    reconectador: [],
  });

  useEffect(() => {
    getEquiposTelgecs();
    getEquiposSeccionador();
  }, []);

  useEffect(() => {
    setPage(0);

    setServiciosFiltrados({
      telgecs: equiposTelgecs.filter((equ) => {
        if (
          filter.nombre.length <= 1 ||
          compararCadenas(equ.nro_set, filter.nombre)
        )
          return equ;
      }),
      seccionador: equiposSeccionador
        .filter((equ) => equ.tipo_equipo == 2)
        .filter((equ) => {
          if (
            filter.nombre.length <= 1 ||
            compararCadenas(equ.nombre, filter.nombre)
          )
            return equ;
        }),
      reconectador: equiposSeccionador
        .filter((equ) => equ.tipo_equipo == 3)
        .filter((equ) => {
          if (
            filter.nombre.length <= 1 ||
            compararCadenas(equ.nombre, filter.nombre)
          )
            return equ;
        }),
    });
  }, [filter, tabSelected]);

  useEffect(() => {
    getUltVisita();
  }, [equiposTelgecs, equiposSeccionador, page]);

  const getUltVisita = (id) => {
    if (id) {
      axios.get(`/api/ultimavisita/${id}`).then(({ data }) => {
        setUltimasVisitas((ult) => ({ ...ult, [id]: data }));
      });
      return;
    }
    equiposTelgecs.forEach((eq, i) => {
      if (
        !ultimasVisitas[eq.id_equipo] &&
        i >= page * pageSize &&
        i <= page * pageSize + pageSize
      ) {
        axios.get(`/api/ultimavisita/${eq.id_equipo}`).then(({ data }) => {
          setUltimasVisitas((ult) => ({ ...ult, [eq.id_equipo]: data }));
        });
        axios.get(`/api/cambiosdebateria/${eq.id_equipo}`).then(({ data }) => {
          setCambiosDeBateria((ult) => ({ ...ult, [eq.id_equipo]: data }));
        });
      }
    });
    equiposSeccionador.forEach((eq, i) => {
      if (
        !ultimasVisitas[eq.id_equipo] &&
        i >= page * pageSize &&
        i <= page * pageSize + pageSize
      )
        axios.get(`/api/ultimavisita/${eq.id_equipo}`).then(({ data }) => {
          setUltimasVisitas((ult) => ({ ...ult, [eq.id_equipo]: data }));
        });
      axios.get(`/api/cambiosdebateria/${eq.id_equipo}`).then(({ data }) => {
        setCambiosDeBateria((ult) => ({ ...ult, [eq.id_equipo]: data }));
      });
    });
  };

  const getEquiposTelgecs = () => {
    axios.get("/api/equipos/telgecs").then(({ data }) => {
      setServiciosFiltrados((fil) => ({
        ...fil,
        telgecs: data,
      }));
      setEquiposTelgecs(data);
    });
  };
  const getEquiposSeccionador = () => {
    axios.get("/api/equipos/seccionador").then(({ data }) => {
      setEquiposSeccionador(data);
      setServiciosFiltrados((fil) => ({
        ...fil,
        seccionador: data.filter((equ) => equ.tipo_equipo == 2),
        reconectador: data.filter((equ) => equ.tipo_equipo == 3),
      }));
    });
  };

  const postEquipo = () => {
    if (newEquipo)
      axios
        .post("/api/equipos", newEquipo)
        .then(({ data }) => {
          setNewEquipo(false);
          getEquiposTelgecs();
          getEquiposSeccionador();
        })
        .catch((error) => console.log({ error }));
  };

  return <ViewPDF />;

  return (
    <>
      {newEquipo && (
        <FormAddEquipo
          setData={setNewEquipo}
          data={newEquipo}
          postEquipo={postEquipo}
        />
      )}
      {updateRow && (
        <UpdateRow
          data={updateRow.data}
          keyData={updateRow.keyData}
          setUpdateRow={setUpdateRow}
          getEquipos={() => {
            getEquiposSeccionador();
            getEquiposTelgecs();
          }}
        />
      )}
      {viewUltimaVisita && (
        <ViewUltimaVisita
          data={ultimasVisitas[viewUltimaVisita.equipo.id_equipo]}
          setData={setViewUltimaVisita}
          equipo={viewUltimaVisita.equipo}
          getUltVisita={getUltVisita}
        />
      )}
      <Flex w={"100%"} alignItems={"center"} flexDir="column">
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
            <Flex flexDir={"column"} ms="15px">
              <Button
                colorScheme={"blue"}
                size="sm"
                mb={"5px"}
                onClick={() => setNewEquipo(NEW_SERVICE_INIT)}
              >
                Nuevo equipo
              </Button>
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
          <Flex w={"100%"} h="30px" border="none" top="0" left={"0"}>
            <Flex
              bg={tabSelected === 0 ? "#FFF" : "gray.200"}
              color={tabSelected === 0 ? "primary" : "gray.400"}
              fontWeight={tabSelected === 0 && "bold"}
              px={"1rem"}
              borderTopRadius="15px"
              name="0"
              cursor={"pointer"}
              onClick={() => setTabSelected(0)}
            >
              Telgecs
            </Flex>
            <Flex
              bg={tabSelected === 1 ? "#FFF" : "gray.200"}
              color={tabSelected === 1 ? "primary" : "gray.400"}
              fontWeight={tabSelected === 1 && "bold"}
              ms="1px"
              px={"1rem"}
              borderTopRadius="15px"
              name="1"
              cursor={"pointer"}
              onClick={() => setTabSelected(1)}
            >
              Seccionador
            </Flex>
            <Flex
              bg={tabSelected === 2 ? "#FFF" : "gray.200"}
              color={tabSelected === 2 ? "primary" : "gray.400"}
              fontWeight={tabSelected === 2 && "bold"}
              ms="1px"
              px={"1rem"}
              borderTopRadius="15px"
              name="1"
              cursor={"pointer"}
              onClick={() => setTabSelected(2)}
            >
              Reconectador
            </Flex>
          </Flex>
          <Flex
            w={"100%"}
            h="85%"
            bg={"#fff"}
            borderBottomRadius="10px"
            p={"10px"}
            flexDir="column"
          >
            <Table
              equiposList={
                tabSelected === 0
                  ? serviciosFiltrados.telgecs
                  : tabSelected === 1
                  ? serviciosFiltrados.seccionador
                  : tabSelected === 2
                  ? serviciosFiltrados.reconectador
                  : []
              }
              setUpdateRow={setUpdateRow}
              tipo={tabSelected + 1 + ""}
              ultimasVisitas={ultimasVisitas}
              cambiosDeBateria={cambiosDeBateria}
              setViewUltimaVisita={setViewUltimaVisita}
              pageSize={pageSize}
              page={page}
            ></Table>
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
                {Math.floor(
                  tabSelected === 0
                    ? serviciosFiltrados.telgecs.length / 30 + 1
                    : tabSelected === 1
                    ? serviciosFiltrados.seccionador.length / 30 + 1
                    : tabSelected === 2
                    ? serviciosFiltrados.reconectador.length / 30 + 1
                    : 0
                )}
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
                    Math.floor(
                      tabSelected === 0
                        ? serviciosFiltrados.telgecs.length / 30 + 1
                        : tabSelected === 1
                        ? serviciosFiltrados.seccionador.length / 30 + 1
                        : tabSelected === 2
                        ? serviciosFiltrados.reconectador.length / 30 + 1
                        : 0
                    )
                      ? page + 1
                      : page
                  )
                }
              >
                {">"}
              </Flex>
              <PDFButton></PDFButton>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default ViewEquipos;

const NEW_SERVICE_INIT = {
  id_rtu: null,
  id_radio: null,
  id_master: null,
  latitud_sur: null,
  latitud_oeste: null,
  orientacion_antena: null,
  fecha_instalacion: null,
  fecha_cambio_bateria: null,
  numero_serie: null,
  numero_serie_reemplazo: null,
  velocidad_rtu: null,
  canal_radio: null,
  rpt_directo: null,
  rpt_asociado: null,
  v_prim: null,
  numero_serie_radio_modem: null,
  piquete: null,
  tipo_sitio: null,
  sitio: null,
  administracion: null,
  observaciones: null,
  tipo_equipo: "1",
  equipo_telgecs: {
    configuracion: null,
    t_m: null,
    numero_serie_medidor: null,
    id_modbus: null,
    placa_radio_modem: null,
    radio_modem_protegido: null,
    capacidad_rtu: null,
  },
  equipo_seccionador: {
    nombre: null,
    marca_modelo: null,
    id_sistema: null,
    v_seccionador: null,
    distribuidor: null,
  },
  equipo_reconectador: {
    tipo: null,
    nombre: null,
    marca_modelo: null,
    id_sistema: null,
    v_seccionador: null,
    distribuidor: null,
    seccionador: null,
  },
};

const compararCadenas = (cad1, cad2) => {
  if (!cad1) return false;
  if (!cad2) return false;
  return cad1.toLowerCase().includes(cad2.toLowerCase());
};
