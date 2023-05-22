import {
  Table as TableC,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
} from "@chakra-ui/react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowUp from "@mui/icons-material/KeyboardArrowUp";
import ArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { Flex, Text } from "@chakra-ui/react";
import { useState } from "react";

const ServiciosTable = ({
  fields,
  columns,
  setUpdateRow,
  pageSize,
  page,
  newEquipo,
  handleChangeData,
  newEquipoData,
  filter
}) => {
  const [updateColumns, setUpdateColumns] = useState(false)
  return (
    <>
      {
        updateColumns &&
        <Flex
          position={"fixed"}
          zIndex={1}
          top={0}
          left={0}
          w={"100%"}
          h={"100%"}
          bg={"#175796aa"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Flex bg={"#FFF"} p={"25px"} borderRadius={"5px"} flexDir={"column"} w={'400px'} align={'center'}>
            <Text>Columns config</Text>
            <Flex flexDir={"column"} w={'100%'}>
              {columns.map((col) => (
                <Flex
                  key={col}
                  w={"100%"}
                  justifyContent={"space-between"}
                  h={"25px"}
                  py={"5px"}
                >
                  <Text>{col}</Text>
                  <Flex my={"1px"} h={"5px"}>
                    <Text>
                      <ArrowUp></ArrowUp>
                    </Text>
                    <Text>
                      <ArrowDown></ArrowDown>
                    </Text>
                  </Flex>
                </Flex>
              ))}
            </Flex>
          </Flex>
        </Flex>
      }
      <TableContainer w={"100%"} h="100%" maxH="100%" overflowY={"scroll"}>
        <TableC size="sm" variant="striped" colorScheme="blue">
          <Thead bg={"#175796"}>
            <Tr>
              {columns.map((key) => (
                <Th key={key} color="#fff">
                  {key}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {newEquipo && (
              <Tr>
                {columns.map((key, i) => (
                  <Td key={key}>
                    <Flex
                      justifyContent={"center"}
                      alignItems="center"
                      w={"100%"}
                      h={"100%"}
                    >
                      <Input
                        p={0}
                        w={"100%"}
                        h={"100%"}
                        borderRadius={"1px"}
                        onChange={handleChangeData}
                        name={key}
                        value={newEquipoData[key]}
                        bg={"#fff"}
                      ></Input>
                    </Flex>
                  </Td>
                ))}
              </Tr>
            )}

            {fields
              .filter(fil => {
                if (!filter.fechaDesde || !filter.fechaHasta) return true
                const fechaInicioTarea = new Date(fil.inicioTarea);
                const fechaFinTarea = new Date(fil.finTarea);
                const fechaFilDesde = new Date(filter.fechaDesde);
                const fechaFilHasta = new Date(filter.fechaHasta);
                if (fechaInicioTarea >= fechaFilDesde && fechaFinTarea <= fechaFilHasta)
                  return true
                return false
              })
              .filter(fil => {
                const filterValue = fil.tipoProblema + ''
                if (!filter.tipoProblema || (filter.tipoProblema && filter.tipoProblema.length < 2)) return true
                if (fil.tipoProblema && filterValue.toLowerCase().includes(filter.tipoProblema.toLowerCase()))
                  return true
                return false
              })
              .filter(fil => {
                if (!filter.solucionado || filter.solucionado === '-') return true
                if (fil.seSoluciono && fil.seSoluciono.toLowerCase().includes(filter.solucionado.toLowerCase()))
                  return true
                return false
              })
              .map((data, i) => {
                if (i >= page * pageSize && i <= page * pageSize + pageSize)
                  return (
                    <Tr key={i}>
                      {columns.map((key) => (
                        <Td
                          key={key}
                          onDoubleClick={() => {
                            //setUpdateRow({ data: data, keyData: key });
                          }}
                        >
                          <Flex justifyContent={"start"} alignItems="center" maxW={'400px'} 
                          overflowX={key === 'solucion' || key === 'observaciones' && 'scroll'} 
                          overflowY={'hidden'}
                            css={{
                              scrollbarWidth: 'thin',
                              '&::-webkit-scrollbar': {
                                width: '3px',
                                height: '3px'
                              },
                              '&::-webkit-scrollbar-thumb': {
                                background: '#888',
                                borderRadius: '3px',
                              },
                              '&::-webkit-scrollbar-track': {
                                background: '#f1f1f1',
                                borderRadius: '3px',
                              },
                            }}
                          >
                            {key === "inicioTarea" || key === "finTarea"
                              ? dateformat(data[key])
                              :
                              key === 'seSoluciono' ?
                                <Text
                                  bg={data[key] === 'Sí' ? 'green' : data[key] === 'No' ? 'red' : '#ffff'}
                                  px={'10px'}
                                  borderRadius={'10px'}
                                  color={'#fff'}
                                >
                                  {data[key]}
                                </Text>
                                :
                                data[key]
                                  ? data[key]
                                  : "-"}
                          </Flex>
                        </Td>
                      ))}
                    </Tr>
                  );
              })}
          </Tbody>
        </TableC>
      </TableContainer>
    </>
  );
};

export default ServiciosTable;

const dateformat = (timestamp) => {
  const date = new Date(timestamp);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};
