import React, { useEffect, useState } from "react";
import { Flex, Text, Select, Button, Input } from "@chakra-ui/react";
import styles from "../styles/Table.module.css";
import axios from "axios";
import FormAddService from "./FormAddService";
import { validarDatosCrearNuevoServicio } from "./validarDatos";
import {
  Table as TableC,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'

const TIPOS_SERVICIOS = { 0: "PREVENTIVO", 1: "CORRECTIVO" };
const TIPOS_EQUIPOS = { 1: "telgecs", 2: "seccionador", 3: "reconectador" };

const NEW_SERVICE_INIT = {
  fechaServicio: "",
  tipoEquipo: "",
  observacionesServicio: "",
  tipoServicio: "0",
  tipoFalla: "0",
  fechaSolucion: "",
  detalleFalla: "",
  detalleSolucion: "",
  observacionesFalla: "",
  solucionado: "0",
  equipo: "12",
};

const ViewServicios = (props) => {
  const [serviciosList, setServiciosList] = useState([]);
  const [filter, setFilter] = useState({
    tipoServicio: -1,
    tipoEquipo: -1,
    nombre: ''
  });
  const [rowsSelected, setRowsSelected] = useState([]);
  const [newService, setNewService] = useState(false);
  const [nombreEquipos, setNombreEquipos] = useState([]);
  const [detallesServicios, setDetallesServicios] = useState([]);
  const [fallasDatos, setFallasDatos] = useState([]);
  const [tabSelected, setTabSelected] = useState(0);
  const [pageSize] = useState(30)
  const [page, setPage] = useState(0)
  const [updateRow, setUpdateRow] = useState(false);
  const [viewTable, setViewTable] = useState(false)

  useEffect(() => {
    getServicios();
    getDetallesServicios();
    axios
      .get("/api/equipos/nombres")
      .then(({ data }) => setNombreEquipos(data));
  }, []);

  const getServicios = () => {
    axios.get("/api/servicios").then(({ data }) => setServiciosList(data));
  };

  const getDetallesServicios = () => {
    axios
      .get("/api/servicios/detalles")
      .then(({ data }) => setDetallesServicios(data));
  };

  const postServicio = () => {
    const validarDatos = validarDatosCrearNuevoServicio(newService);
    setFallasDatos(validarDatos);
    if (newService && validarDatos[0].value && validarDatos[1].value) {
      axios
        .post("/api/servicios", newService)
        .then(({ data }) => {
          setNewService(false);
          getServicios();
        })
        .catch((error) => console.log({ error }));
    }
  };

  useEffect(() => {
    setPage(0)
  }, [filter, tabSelected]);

  return (
    <>
      {newService && (
        <FormAddService
          setData={setNewService}
          data={newService}
          postServicio={postServicio}
          nombreEquipos={nombreEquipos}
          fallasDatos={fallasDatos}
          validarDatos={fallasDatos}
          detallesServicios={detallesServicios}
          getDetallesServicios={getDetallesServicios}
        />
      )}
      {viewTable && (
        <SelectColumns
          setViewTable={setViewTable}
          servicios={serviciosList}
          rowsSelected={rowsSelected}
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
          <Flex flexDir={'column'} alignItems={'center'} justifyContent='center'>
            <Select
              value={filter.tipoServicio}
              w="250px"
              my='3px'
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
              my='3px'
              onChange={(e) => {
                setFilter({ ...filter, tipoEquipo: e.target.value });
              }}
            >
              <option value="-1">Todos los tipos de equipos</option>
              <option value="1">Telgecs</option>
              <option value="2">Seccionador</option>
              <option value="3">Reconectador</option>
            </Select>
          </Flex>
          <Flex flexDir={'column'} alignItems={'center'} justifyContent={'center'}>
            <Select
              value={filter.servicio}
              w="250px"
              ms={"15px"}
              my='3px'
              onChange={(e) => {
                setFilter({ ...filter, servicio: e.target.value });
              }}
            >
              <option value="-1">Todos los servicios</option>
              {Array.isArray(detallesServicios) &&
                detallesServicios.map((nom) => {
                  return (
                    <option
                      value={nom.id_servicio_detalle}
                      key={nom.id_servicio_detalle}
                    >
                      {nom.detalle}
                    </option>
                  );
                })}
            </Select>
            <Input
              value={filter.nombre}
              w="250px"
              ms={"15px"}
              my='3px'
              onChange={(e) => {
                setFilter({ ...filter, nombre: e.target.value });
              }}
              placeholder='Nombre equipo'
            >
            </Input>
          </Flex>
          <Flex flexDir={"column"} ms="15px">
            <Button
              colorScheme={"blue"}
              size="sm"
              mb={"5px"}
              onClick={() => setNewService(NEW_SERVICE_INIT)}
            >
              Nuevo servicio
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
              Servicios
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
              serviciosList={
                tabSelected === 0
                  ? serviciosList.filter(serv => {
                    const equ = nombreEquipos.find(f => f.id_equipo == serv.id_equipo);
                    const equNom = equ ? equ.nombreReconectador || equ.nombreSeccionador || equ.nombreTelgecs : null
                    if (
                      (filter.tipoServicio == -1 || serv.tipo_servicio == filter.tipoServicio) &&
                      (filter.nombre.length <= 1 || (equNom && equNom.includes(filter.nombre)))
                    ) return serv
                  })
                  : []
              }
              setUpdateRow={setUpdateRow}
              tipo={tabSelected + 1 + ""}
              pageSize={pageSize}
              page={page}
              detallesServicios={detallesServicios}
              nombreEquipos={nombreEquipos}
              setRowsSelected={setRowsSelected}
              rowsSelected={rowsSelected}
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
          <Button w={'150px'} mt='15px' onClick={() => setViewTable(true)}>Generar tabla</Button>
        </Flex>
      </Flex>
    </>
  );
};

export default ViewServicios;


const Table = ({
  serviciosList,
  setUpdateRow,
  tipo,
  pageSize,
  page,
  detallesServicios,
  nombreEquipos,
  setRowsSelected,
  rowsSelected
}) => {
  let keys =
    tipo === "1"
      ? Object.keys(FALLAS_TABLE)
      : [];

  return (
    <TableContainer w={"100%"} h='100%' maxH="100%" overflowY={"scroll"}>
      <TableC size="sm" variant="striped" colorScheme="blue">
        <Thead bg={"#175796"}>
          <Tr>
            <Th key={0} color="#fff">
              Seleccionar
            </Th>
            {keys.map((key) => (
              <Th key={key} color="#fff">
                {tipo === "1"
                  && FALLAS_TABLE[key]
                }
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {serviciosList.map((data, i) => {
            const thisEquipo = nombreEquipos.find(f => f.id_equipo === data.id_equipo)
            const thisServicio = detallesServicios.find(f => f.id_servicio_detalle === data.servicio)

            if (i >= page * pageSize && i <= (page * pageSize) + pageSize)
              return (
                <Tr key={i}>
                  <Td
                    key={i + 1}
                  >
                    <Checkbox
                      value={rowsSelected.find(id_servicio => id_servicio === data.id_servicio) ? true : false}
                      onChange={(e) => {
                        setRowsSelected(rows => {
                          if (rowsSelected.find(id_servicio => id_servicio === data.id_servicio))
                            return rows.filter(id_servicio => id_servicio !== data.id_servicio)
                          else return [...rows, data.id_servicio]
                        })
                      }}
                      checked={rowsSelected.find(id_servicio => id_servicio === data.id_servicio) ? true : false}
                    ></Checkbox>
                  </Td>
                  {
                    keys.map((key) => (
                      <Td
                        key={key}
                        onDoubleClick={() => {
                          setUpdateRow({ data: data, keyData: key });
                        }}
                      >
                        {data[key] ?
                          key === 'servicio' ?
                            thisServicio ? thisServicio.detalle
                              : '-'
                            :
                            key === 'id_equipo' ?
                              thisEquipo ? thisEquipo.nombreTelgecs ? thisEquipo.nombreTelgecs
                                : thisEquipo.nombreSeccionador ? thisEquipo.nombreSeccionador
                                  : thisEquipo.nombreReconectador ? thisEquipo.nombreReconectador
                                    : '-'
                                : '-'
                              :
                              data[key]
                          : '-'}
                      </Td>
                    ))
                  }
                </Tr>
              );
          })}
        </Tbody>
      </TableC>
    </TableContainer >
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
          ACTUALIZAR DATO: {SERVICIOS_TABLE[keyData]}
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
const SelectColumns = ({ rowsSelected, servicios, setViewTable }) => {
  const [viewTables, setViewTables] = useState(false);
  const [columnsSelected, setColumnsSelected] = useState([]);
  const keys = Object.keys(FALLAS_TABLE)
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
        h="450px"
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
          Selecciona las columnas
        </Text>
        <CheckboxGroup mt={'25px'}>
          {
            keys.map(key => (
              <Flex w={'90%'} key={key}>
                <Checkbox
                  onChange={(e) => {
                    setColumnsSelected(keys => {
                      if (columnsSelected.find(k => k === key))
                        return keys.filter(k => k !== key)
                      else return [...keys, key]
                    })
                  }}
                ></Checkbox>
                <Text>{FALLAS_TABLE[key]}</Text>
              </Flex>
            ))
          }
        </CheckboxGroup>
        <Flex mt={'25px'}>
          <Button
            my={"5px"}
            mx="15px"
            colorScheme={"orange"}
            onClick={() => setViewTable(false)}
          >
            Cancelar
          </Button>
          <Button
            my={"5px"}
            mx="15px"
            colorScheme={"blue"}
            onClick={() => { console.log(columnsSelected) }}
          >
            Ver Tabla
          </Button>
        </Flex>
      </Flex>
    </Flex >
  );
};

const FALLAS_TABLE = {
  servicio: "Servicio",
  fecha: "Fecha realizado",
  tipo_servicio: "Tipo de servicio",
  id_equipo: "Equipo",
  observaciones_servicios: "Observaciones",
  tipo_falla: "Tipo de falla",
  detalle_falla: "Detalle falla",
  solucionado: "Solucionado",
  fecha_solucion: "Fecha solucion",
  detalle_solucion: "Detalle Solucion",
  observaciones_fallas: "Observaciones Falla",
};