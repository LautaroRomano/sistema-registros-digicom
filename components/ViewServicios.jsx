import React, { useEffect, useState } from "react";
import { Flex, Text, Select, Button, Checkbox } from "@chakra-ui/react";
import styles from "../styles/Table.module.css";
import axios from "axios";
import FormAddService from "./FormAddService";

const TIPOS_SERVICIOS = { 0: "PREVENTIVO", 1: "CORRECTIVO" };
const TIPOS_EQUIPOS = { 0: "TELGECS", 1: "SECCIONADOR", 2: "RECONECTADOR" };

const ViewServicios = (props) => {
  const [serviciosList, setServiciosList] = useState([]);
  const [filter, setFilter] = useState({
    tipoServicio: -1,
    tipoEquipo: -1,
  });
  const [rowSelected, setRowSelected] = useState();
  const [newService, setNewService] = useState(false);

  useEffect(() => {
    axios.get("/api/servicios").then(({ data }) => setServiciosList(data));
  }, []);

  return (
    <>
      {newService && (
        <FormAddService setData={setNewService} data={newService} />
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
          <Flex>
            <Select
              value={filter.tipoServicio}
              w="250px"
              onChange={(e) => {
                setFilter({ ...filter, tipoServicio: e.target.value });
              }}
            >
              <option value="-1">Todos los tipos de servicios</option>
              <option value="0">Preventivo</option>
              <option value="1">Correctivo</option>
            </Select>
            <Select
              value={filter.tipoEquipo}
              w="250px"
              ms={"15px"}
              onChange={(e) => {
                setFilter({ ...filter, tipoEquipo: e.target.value });
              }}
            >
              <option value="-1">Todos los tipos de equipos</option>
              <option value="0">Telgecs</option>
              <option value="1">Seccionador</option>
              <option value="2">Reconectador</option>
            </Select>
          </Flex>
          <Flex flexDir={"column"} ms="15px">
            <Button
              colorScheme={"blue"}
              size="sm"
              mb={"5px"}
              onClick={() => setNewService({})}
            >
              Agregar
            </Button>
            <Button colorScheme={"blue"} size="sm" onClick={() => {}}>
              Modificar
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
            <Text mt={"-10px"}>Lista de servicios</Text>
          </Flex>
          <Table
            serviciosList={serviciosList}
            filter={filter}
            rowSelected={{
              rowSelected: rowSelected,
              setRowSelected: setRowSelected,
            }}
          ></Table>
        </Flex>
      </Flex>
    </>
  );
};

const Table = ({ serviciosList, filter, rowSelected }) => (
  <Flex w={"100%"} h="100%" overflowY={"scroll"}>
    <table className={styles.container}>
      <thead>
        <tr>
          <th>
            <h1>Tipo servicio</h1>
          </th>
          <th>
            <h1>Fecha realizado</h1>
          </th>
          <th>
            <h1>Tipo equipo</h1>
          </th>
          <th>
            <h1>Equipo</h1>
          </th>
          <th>
            <h1>Observaciones</h1>
          </th>
          <th>
            <h1>Fecha Solucion</h1>
          </th>
          <th>
            <h1>Tipo falla</h1>
          </th>
          <th>
            <h1>Detalle falla</h1>
          </th>
          <th>
            <h1>Solucionado</h1>
          </th>
          <th>
            <h1>Detalle solucion</h1>
          </th>
          <th>
            <h1>Observaciones</h1>
          </th>
        </tr>
      </thead>
      <tbody>
        {serviciosList.map((data, i) => {
          let fecha = new Date(data.fecha);
          let dia = fecha.getDate().toString().padStart(2, "0");
          let mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
          let anio = fecha.getFullYear().toString();
          const nuevaFechaServicio = `${dia}/${mes}/${anio}`;
          fecha = new Date(data.fecha_solucion);
          dia = fecha.getDate().toString().padStart(2, "0");
          mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
          anio = fecha.getFullYear().toString();
          const nuevaFechaFalla = data.fecha_solucion
            ? `${dia}/${mes}/${anio}`
            : "No corresponde";
          if (
            (data.tipo_servicio === TIPOS_SERVICIOS[filter.tipoServicio] ||
              filter.tipoServicio == -1) &&
            (data.tipo_equipo === TIPOS_EQUIPOS[filter.tipoEquipo] ||
              filter.tipoEquipo == -1)
          )
            return (
              <tr
                key={i}
                className={
                  rowSelected.rowSelected &&
                  rowSelected.rowSelected.id_servicio === data.id_servicio &&
                  styles.selected
                }
                onClick={() => {
                  if (
                    rowSelected.rowSelected &&
                    rowSelected.rowSelected.id_servicio === data.id_servicio
                  )
                    rowSelected.setRowSelected(undefined);
                  else rowSelected.setRowSelected(data);
                }}
              >
                <td>
                  {data.tipo_servicio ? data.tipo_servicio : "No corresponde"}
                </td>
                <td>
                  {nuevaFechaServicio ? nuevaFechaServicio : "No corresponde"}
                </td>
                <td>
                  {data.tipo_equipo ? data.tipo_equipo : "No corresponde"}
                </td>
                <td>{data.id_equipo ? data.id_equipo : "No corresponde"}</td>
                <td>
                  {data.observaciones_servicios
                    ? data.observaciones_servicios
                    : "No corresponde"}
                </td>
                <td>{nuevaFechaFalla ? nuevaFechaFalla : "No corresponde"}</td>
                <td>{data.tipo_falla ? data.tipo_falla : "No corresponde"}</td>
                <td>
                  {data.detalle_falla ? data.detalle_falla : "No corresponde"}
                </td>
                <td>
                  {data.solucionado
                    ? data.solucionado
                      ? "SI"
                      : "NO"
                    : "No corresponde"}
                </td>
                <td>
                  {data.detalle_solucion
                    ? data.detalle_solucion
                    : "No corresponde"}
                </td>
                <td>
                  {data.observaciones_fallas
                    ? data.observaciones_fallas
                    : "No corresponde"}
                </td>
              </tr>
            );
        })}
      </tbody>
    </table>
  </Flex>
);

export default ViewServicios;
