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
import { Flex } from "@chakra-ui/react";
import {
  EQUIPOS_SECCIONADOR_TABLE,
  EQUIPOS_TELGEC_TABLE,
} from "../constants/viewEquipos";

const EquiposTable = ({
  equiposList,
  setUpdateRow,
  tipo,
  ultimasVisitas,
  cambiosDeBateria,
  setViewUltimaVisita,
  pageSize,
  page,
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
    <TableContainer w={"100%"} h="100%" maxH="100%" overflowY={"scroll"}>
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
            if (i >= page * pageSize && i <= page * pageSize + pageSize)
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
                          : key === "fecha_cambio_bateria"
                          ? cambiosDeBateria[data.id_equipo] &&
                            cambiosDeBateria[data.id_equipo][0]
                            ? cambiosDeBateria[data.id_equipo][0].fecha
                            : ""
                          : data[key]
                          ? data[key]
                          : "-"}
                        {key === "ultima_visita" && (
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

export default EquiposTable;
