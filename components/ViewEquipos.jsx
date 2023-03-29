import React, { useEffect, useState } from "react";
import { Flex, Text, Select, Button, Input } from "@chakra-ui/react";
import axios from "axios";
import FormAddEquipo from "./FormAddEquipo";
import {
  Table as TableC,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ViewUltimaVisita from "./ViewUltimaVisita";

const ViewEquipos = (props) => {
  const [filter, setFilter] = useState({
    tipoEquipo: -1,
  });
  const [newEquipo, setNewEquipo] = useState(false);
  const [equiposTelgecs, setEquiposTelgecs] = useState([]);
  const [equiposSeccionador, setEquiposSeccionador] = useState([]);
  const [updateRow, setUpdateRow] = useState(false);
  const [tabSelected, setTabSelected] = useState(0);
  const [ultimasVisitas, setUltimasVisitas] = useState({});
  const [viewUltimaVisita, setViewUltimaVisita] = useState(false);
  const [pageSize] = useState(30)
  const [page, setPage] = useState(0)

  useEffect(() => {
    getEquiposTelgecs();
    getEquiposSeccionador();
  }, []);

  useEffect(() => {
    setPage(0)
  }, [filter, tabSelected]);

  useEffect(() => {
    getUltVisita();
  }, [equiposTelgecs, equiposSeccionador, page]);

  const getUltVisita = () => {
    equiposTelgecs.forEach((eq, i) => {
      if (!ultimasVisitas[eq.id_equipo] && i >= page * pageSize && i <= (page * pageSize) + pageSize)
        axios.get(`/api/ultimavisita/${eq.id_equipo}`).then(({ data }) => {
          setUltimasVisitas((ult) => ({ ...ult, [eq.id_equipo]: data }));
        });
    });
    equiposSeccionador.forEach((eq, i) => {
      if (!ultimasVisitas[eq.id_equipo] && i >= page * pageSize && i <= (page * pageSize) + pageSize)
        axios.get(`/api/ultimavisita/${eq.id_equipo}`).then(({ data }) => {
          setUltimasVisitas((ult) => ({ ...ult, [eq.id_equipo]: data }));
        });
    });
  };

  const getEquiposTelgecs = () => {
    axios
      .get("/api/equipos/telgecs")
      .then(({ data }) => setEquiposTelgecs(data));
  };
  const getEquiposSeccionador = () => {
    axios
      .get("/api/equipos/seccionador")
      .then(({ data }) => setEquiposSeccionador(data));
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
      <Flex
        w={"100%"}
        alignItems={"center"}
        flexDir="column"
      >
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
          <Flex flexDir={"column"} ms="15px">
            <Button
              colorScheme={"blue"}
              size="sm"
              mb={"5px"}
              onClick={() => setNewEquipo(NEW_SERVICE_INIT)}
            >
              Agregar
            </Button>
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
            flexDir='column'
          >
            <Table
              equiposList={
                tabSelected === 0
                  ? equiposTelgecs
                  : tabSelected === 1
                    ? equiposSeccionador.filter((equ) => equ.tipo_equipo == 2)
                    : tabSelected === 2
                      ? equiposSeccionador.filter((equ) => equ.tipo_equipo == 3)
                      : []
              }
              setUpdateRow={setUpdateRow}
              tipo={tabSelected + 1 + ""}
              ultimasVisitas={ultimasVisitas}
              setViewUltimaVisita={setViewUltimaVisita}
              pageSize={pageSize}
              page={page}
            ></Table>
            <Flex mt={'5px'} w='100%' justifyContent={'end'}>
              <Flex
                bg={'primary'}
                w={'25px'}
                h='25px'
                borderRadius={'50%'}
                color='#FFF'
                textAlign='center'
                justifyContent={'center'}
                fontWeight={'550'}
                cursor='pointer'
                mx={'5px'}
                onClick={() => setPage(page => page > 0 ? page - 1 : page)}
              >
                {'<'}
              </Flex>
              <Flex bg={'#FFF'} h='30px'>Pagina: {page + 1}</Flex>
              <Flex
                bg={'primary'}
                w={'25px'}
                h='25px'
                borderRadius={'50%'}
                color='#FFF'
                textAlign='center'
                justifyContent={'center'}
                fontWeight={'550'}
                cursor='pointer'
                mx={'5px'}
                onClick={() => setPage(page => page + 1)}
              >
                {'>'}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

const Table = ({
  equiposList,
  setUpdateRow,
  tipo,
  ultimasVisitas,
  setViewUltimaVisita,
  pageSize,
  page
}) => {
  let keys =
    tipo === "1"
      ? Object.keys(EQUIPOS_TELGEC_TABLE)
      : tipo === "2"
        ? Object.keys(EQUIPOS_SECCIONADOR_TABLE)
        : tipo === "3"
          ? Object.keys(EQUIPOS_SECCIONADOR_TABLE)
          : [];

  return (
    <TableContainer w={"100%"} h='100%' maxH="100%" overflowY={"scroll"}>
      <TableC size="sm" variant="striped" colorScheme="blue">
        <Thead bg={"#175796"}>
          <Tr>
            {keys.map((key) => (
              <Th key={key} color="#fff">
                {tipo === "1"
                  ? EQUIPOS_TELGEC_TABLE[key]
                  : tipo === "2"
                    ? EQUIPOS_SECCIONADOR_TABLE[key]
                    : tipo === "3" && EQUIPOS_SECCIONADOR_TABLE[key]}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {equiposList.map((data, i) => {
            if (i >= page * pageSize && i <= (page * pageSize) + pageSize)
              return (
                <Tr key={i}>
                  {keys.map((key) => (
                    <Td
                      key={key}
                      onDoubleClick={() => {
                        setUpdateRow({ data: data, keyData: key });
                      }}
                    >
                      <Flex justifyContent={"center"} alignItems="center">
                        {key === "ultima_visita"
                          ? ultimasVisitas[data.id_equipo] &&
                            ultimasVisitas[data.id_equipo][0]
                            ? ultimasVisitas[data.id_equipo][0].fecha
                            : ""
                          : data[key]
                            ? data[key]
                            : "-"}
                        {key === "ultima_visita" &&
                          (
                            <Flex
                              w={"25px"}
                              h="25px"
                              color={"blue.400"}
                              cursor="pointer"
                              onClick={() => {
                                setViewUltimaVisita({
                                  equipo: data,
                                  data: ultimasVisitas[data.id_equipo],
                                });
                              }}
                            >
                              <AddCircleIcon
                                style={{ width: "100%", height: "100%" }}
                              />
                            </Flex>
                          )}
                      </Flex>
                    </Td>
                  ))}
                </Tr>
              );
          })}
        </Tbody>
      </TableC>
    </TableContainer>
  );
};

const UpdateRow = ({ data, keyData, setUpdateRow, getEquipos }) => {
  const [newData, setNewData] = useState(data[keyData]);

  const handleGuardar = () => {
    axios
      .put("/api/equipos", {
        newData: newData,
        keyData: keyData,
        id_equipo: data.id_equipo,
        tipo: data.tipo_equipo,
      })
      .then(({ data }) => {
        setUpdateRow(false);
        getEquipos();
      });
  };

  return (
    <Flex
      position={"fixed"}
      zIndex="10"
      height={"100vh"}
      w="100vw"
      bg={"#0005"}
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        w={"400px"}
        h="250px"
        bg={"#fff"}
        borderRadius="10px"
        flexDir={"column"}
        alignItems="center"
        justifyContent={"center"}
        position="relative"
      >
        <Text
          bg={"#175796"}
          my={"5px"}
          fontSize="16px"
          fontWeight={"bold"}
          w="100%"
          color="#FFF"
          textAlign={"center"}
          py="10px"
        >
          ACTUALIZAR DATO: {EQUIPOS_TELGEC_TABLE[keyData]}
        </Text>
        <Input
          value={newData}
          my={"25px"}
          w="70%"
          onChange={(e) => setNewData(e.target.value)}
        ></Input>
        <Flex>
          <Button
            my={"5px"}
            mx="15px"
            colorScheme={"orange"}
            onClick={() => setUpdateRow(false)}
          >
            Cancelar
          </Button>
          <Button
            my={"5px"}
            mx="15px"
            colorScheme={"blue"}
            onClick={handleGuardar}
          >
            Guardar
          </Button>
        </Flex>
      </Flex>
    </Flex>
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
const EQUIPOS_TELGEC_TABLE = {
  administracion: "Administracion",
  sucursal: "Sucursal",
  localidad: "Localidad",
  direccion: "Direccion",
  nro_set: "SET",
  codigo_caja: "Codigo Caja",
  ultima_visita: "Ultima Visita",
  v_prim: "V Prim",
  configuracion: "Config",
  t_m: "T/M",
  numero_serie_medidor: "Nro. Serie Medidor",
  canal_radio: "Canal de radio",
  rpt_directo: "Por RPT/Directo",
  rpt_asociado: "RPT asociado",
  id_rtu: "ID RTU",
  id_modbus: "ID Modbus",
  id_radio: "ID Radio",
  id_master: "ID Master",
  latitud_sur: "Latitud Sur",
  latitud_oeste: "Latitud Oeste",
  orientacion_antena: "Orientacion Antena",
  fecha_instalacion: "Fecha instalacion",
  fecha_cambio_bateria: "Cambio de bateria",
  numero_serie: "Numero de serie",
  numero_serie_reemplazo: "Nro. de serie reemplazo",
  placa_radio_modem: "Placa de RM",
  numero_serie_radio_modem: "Nro. de serie RM",
  programa_radio_modem: "Programa de RM",
  radio_modem_protegido: "RM protegido",
  velocidad_rtu: "Velocidad RTU",
  capacidad_rtu: "Capacidad RTU",
  observaciones: "Observaciones",
};
const EQUIPOS_SECCIONADOR_TABLE = {
  administracion: "Administracion",
  sucursal: "Sucursal",
  localidad: "Localidad",
  direccion: "Direccion",
  tipo: "Tipo",
  nombre: "Nombre",
  ultima_visita: "Ultima Visita",
  marca_modelo: "Marca, modelo",
  id_sistema: "ID Sistema",
  id_rtu: "ID RTU",
  id_radio: "ID Radio",
  id_master: "ID Master",
  canal_radio: "Canal de radio",
  rpt_directo: "Por RPT/Directo",
  rpt_asociado: "RPT asociado",
  v_prim: "V Prim",
  v_seccionador: "V Seccionador",
  distribuidor: "Distribuidor",
  configuracion: "Config",
  piquete: "Piquete",
  latitud_sur: "Latitud Sur",
  latitud_oeste: "Latitud Oeste",
  orientacion_antena: "Orientacion Antena",
  fecha_instalacion: "Fecha instalacion",
  fecha_cambio_bateria: "Cambio de bateria",
  numero_serie: "Numero de serie",
  numero_serie_reemplazo: "Nro. de serie reemplazo",
  velocidad_rtu: "Velocidad RTU",
  numero_serie_radio_modem: "Nro. de serie RM",
  observaciones: "Observaciones",
};
