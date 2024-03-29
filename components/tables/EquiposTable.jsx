import {
  Table as TableC,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  Text,
} from "@chakra-ui/react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import ViewUltimaVisita from "../ViewUltimaVisita";
import { useEffect } from "react";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import Link from "next/link";

const EquiposTable = ({
  equiposList,
  getEquipos,
  equiposConfig,
  setUpdateRow,
  pageSize,
  page,
  newEquipo,
  postEquipo,
  handleChangeData,
  newEquipoData,
  filter,
}) => {
  let filterKeys = filter ? Object.keys(filter) : [];
  filterKeys = filterKeys.filter((fil) => filter[fil].length > 0);
  let keys = equiposConfig;

  const [viewUltimaVisita, setViewUltimaVisita] = useState(false);

  useEffect(() => {
    if (viewUltimaVisita)
      setViewUltimaVisita(
        equiposList.find((f) => f._id === viewUltimaVisita._id)
      );
  }, [equiposList]);

  return (
    <>
      {viewUltimaVisita && (
        <ViewUltimaVisita
          data={viewUltimaVisita}
          setData={setViewUltimaVisita}
          getEquipos={getEquipos}
        />
      )}

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
            {newEquipo && (
              <Tr>
                {keys.map((key, i) => (
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

            {equiposList
              .filter((equipo) => {
                let flag = 1;
                if (filterKeys.length === 0) return true;
                for (const key of filterKeys) {
                  if (!compararCadenas(equipo[key] + "", filter[key])) flag = 0;
                }
                return flag;
              })
              .map((data, i) => {
                const planillaLink = `/planilla/${data._id}/${data.coleccion}`
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
                            {key === "ultima_visita" ? (
                              data[key] && Array.isArray(data[key]) ? (
                                data[key][0]
                              ) : (
                                "-"
                              )
                            ) : key === "planilla" ? (
                              <Link  href={planillaLink} target="_blank">
                                <Text color={"#0F3A64"} _hover={{bg:'#0F3A6433'}} borderRadius={'50%'} p={'5px'}>
                                  <LibraryBooksIcon />
                                </Text>
                              </Link>
                            ) : data[key] ? (
                              data[key]
                            ) : (
                              "-"
                            )}
                            {key === "ultima_visita" && (
                              <Flex
                                w={"25px"}
                                h="25px"
                                color={"blue.400"}
                                cursor="pointer"
                                onClick={() => {
                                  setViewUltimaVisita(data);
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
    </>
  );
};

export default EquiposTable;

const compararCadenas = (cad1, cad2) => {
  console.log(cad1, cad2);
  if (!cad1) return false;
  if (!cad2) return false;
  return cad1.toLowerCase().includes(cad2.toLowerCase());
};
