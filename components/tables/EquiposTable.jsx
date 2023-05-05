import {
  Table as TableC,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input
} from "@chakra-ui/react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Flex } from "@chakra-ui/react";
import { useState } from "react";

const EquiposTable = ({
  equiposList,
  equiposConfig,
  setUpdateRow,
  pageSize,
  page,
  newEquipo,
  postEquipo,
  handleChangeData,
  newEquipoData,
  filter
}) => {
  const filterKeys = filter ? Object.keys(filter) : []
  let keys = equiposConfig

  return (
    <TableContainer w={"100%"} h="100%" maxH="100%" overflowY={"scroll"}>
      <TableC size="sm" variant="striped" colorScheme="blue">
        <Thead bg={"#175796"}>
          <Tr>
            {keys.map((key) => (
              <Th key={key} color="#fff">
                {key}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {
            newEquipo &&
            <Tr >
              {keys.map((key, i) => (
                <Td
                  key={key}
                >
                  <Flex justifyContent={"center"} alignItems="center" w={"100%"} h={"100%"}>
                    <Input p={0} w={"100%"} h={"100%"} borderRadius={'1px'} onChange={handleChangeData} name={key} value={newEquipoData[key]} bg={'#fff'}></Input>
                  </Flex>
                </Td>
              ))}
            </Tr>
          }

          {equiposList
            .filter(equipo => {
              if(filterKeys.length === 0) return true
              for (const key of filterKeys) {
                if (filter[key].length < 2) return true
                if (compararCadenas(equipo[key] + '', filter[key])) return true
              }
              return false
            })
            .map((data, i) => {
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
                          {
                            data[key]
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

const compararCadenas = (cad1, cad2) => {
  if (!cad1) return false;
  if (!cad2) return false;
  return cad1.toLowerCase().includes(cad2.toLowerCase());
};

