import React, { useEffect, useState } from "react";
import { Flex, Text, Select, Button, Input } from "@chakra-ui/react";
import styles from "../styles/Table.module.css";
import axios from "axios";
import FormAddEquipo from "./FormAddEquipo";
import {
  Table as TableC,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";

const ViewEquiposTelgecs = (props) => {
  const [equipos, setEquipos] = useState([]);

  useEffect(() => {
    getEquiposTelgecs();
    getEquiposSeccionador();
  }, []);

  const getEquiposTelgecs = () => {
    axios.get("/api/equipos/telgecs").then(({ data }) => setEquipos(data));
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
      <Flex
        w={"100%"}
        alignItems={"center"}
        flexDir="column"
        overflowY={"scroll"}
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
          w={"80%"}
          h="60%"
          px={"1.5rem"}
          py={"1rem"}
          bg="#fff"
          justifyContent="center"
          alignItems={"start"}
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
            <Text mt={"-10px"}>Lista de equipos telgecs</Text>
          </Flex>
          <Table
            equiposList={equipos}
            setUpdateRow={setUpdateRow}
            tipo="1"
          ></Table>
        </Flex>

        <Flex
          w={"80%"}
          h="60%"
          px={"1.5rem"}
          py={"1rem"}
          bg="#fff"
          justifyContent="center"
          alignItems={"start"}
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
            <Text mt={"-10px"}>Lista de equipos seccionador</Text>
          </Flex>
          <Table
            equiposList={equiposSeccionador}
            setUpdateRow={setUpdateRow}
            tipo="2"
          ></Table>
        </Flex>

        <Flex
          border="none"
          w={"90%"}
          h="90%"
          position="relative"
          flexDir={"column"}
        >
          <Flex
            w={"100%"}
            h="30px"
            bg={"#fff"}
            border="none"
            top="0"
            left={"0"}
          >
            <Flex
              bg={selected === 0 ? "primary" : "gray.200"}
              color={selected === 0 ? "#fff" : "gray.700"}
              px={"1rem"}
              borderTopRadius="15px"
              name="0"
              cursor={"pointer"}
              onClick={() => handleChangeSelected(0)}
            >
              Equipos Telgecs
            </Flex>
            <Flex
              bg={selected === 1 ? "primary" : "gray.200"}
              color={selected === 1 ? "#fff" : "gray.700"}
              ms="1px"
              px={"1rem"}
              borderTopRadius="15px"
              name="1"
              cursor={"pointer"}
              onClick={() => handleChangeSelected(1)}
            >
              Equipos Seccionador
            </Flex>
          </Flex>
          <Flex w={"100%"} h="100%" bg={"primary"} borderBottomRadius="10px">
            {tabSelected === 0 ? (
              <ViewEquiposTelgecs />
            ) : (
              <ViewEquiposSeccioandor />
            )}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

const Table = ({ equiposList, setUpdateRow, tipo }) => {
  let keys =
    tipo === "1"
      ? Object.keys(EQUIPOS_TELGEC_TABLE)
      : tipo === "2" && Object.keys(EQUIPOS_SECCIONADOR_TABLE);
  return (
    <TableContainer w={"100%"} h="100%" overflowY={"scroll"}>
      <TableC size="sm" variant="striped" colorScheme="blue">
        <Thead bg={"#175796"}>
          <Tr>
            {keys.map((key) => (
              <Th key={key} color="#fff">
                {tipo === "1"
                  ? EQUIPOS_TELGEC_TABLE[key]
                  : tipo === "2" && EQUIPOS_SECCIONADOR_TABLE[key]}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {equiposList.map((data, i) => {
            return (
              <Tr key={i}>
                {keys.map((key) => (
                  <Td
                    key={key}
                    onDoubleClick={() => {
                      setUpdateRow({ data: data, keyData: key });
                    }}
                  >
                    {data[key]
                      ? key === "fecha_instalacion" || key === "cambio_bateria"
                        ? armarFecha(data[key]).anio +
                          "/" +
                          armarFecha(data[key]).mes +
                          "/" +
                          armarFecha(data[key]).dia
                        : data[key]
                      : "-"}
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

export default ViewEquiposTelgecs;

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

const armarFecha = (fec) => {
  let fecha = new Date(fec);
  let dia = fecha.getDate().toString().padStart(2, "0");
  let mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
  let anio = fecha.getFullYear().toString();

  return { dia, mes, anio };
};
