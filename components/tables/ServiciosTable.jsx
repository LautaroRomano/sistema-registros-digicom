import {
  Table as TableC,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  Select,
  Button
} from "@chakra-ui/react";
import { Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const ServiciosTable = ({
  fields,
  columns,
  setUpdateRow,
  pageSize,
  page,
  newEquipo,
  handleChangeData,
  newEquipoData,
  config,
  getAll
}) => {
  const [insertTipoProblema,setInsertTipoProblema] = useState(false)

  const handleChange = ({ target }) => {
    const { name, value } = target;
    if (value === "Sin tipo de problema" || value === "Sin tipo de solucion")
      return;
    if (name === "tipoProblema" || name === "tipoSolucion") {
      setInsertTipoProblema((state) => ({
        ...state,
        [name]: state[name] ? [...state[name], value] : [value],
      }));
    } 
  };

  const sendNuevoTipoDeSolucion = () => {
    Swal.fire({
      title: "Ingresa el nuevo tipo de solucion",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Guardar",
      showLoaderOnConfirm: true,
      preConfirm: (text) => {
        console.log("guardar", text);
        let configAux = config;
        configAux.tiposDeSoluciones.push(text);
        axios
          .put("/api/getconfig", {
            _id: configAux._id,
            field: "tiposDeSoluciones",
            newData: configAux.tiposDeSoluciones,
          })
          .then(({ data }) => {
            getAll();
          });
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Guardado correctamente`,
        });
      }
    });
  };

  const deleteTipoDe = (tp, name) => {
    setInsertTipoProblema((state) => ({
      ...state,
      [name]: state[name] ? state[name].filter((f) => f !== tp) : [],
    }));
  };

  const handleSave = ()=>{
    const collection = insertTipoProblema.coleccion
    axios
      .put(`/api/servicios`, {
        newData: insertTipoProblema.tipoSolucion,
        keyData: "tipoSolucion",
        _id: insertTipoProblema._id,
      })
      .then(({ data }) => {
        getAll();
        setInsertTipoProblema(false)
      });
  }

  return (
    <>
      {
        insertTipoProblema &&
        <Flex
          position={"fixed"}
          zIndex={10}
          top={0}
          left={0}
          w={"100%"}
          h={"100%"}
          bg={"#175796aa"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Flex bg={"#FFF"} p={"25px"} borderRadius={"5px"} flexDir={"column"} w={'800'} align={'center'} position={'relative'}>
            <Text>Tipos de soluciones</Text>
            <Text position={'absolute'} right={5} bg={'#00468C'} borderRadius={'50%'} minW={'15px'} minH={'15px'} fontSize={'12px'} color={'#FFF'} textAlign={'center'} cursor={'pointer'} 
            onClick={()=>setInsertTipoProblema(false)}
            >X</Text>
            {insertTipoProblema.tipoSolucion &&
              insertTipoProblema.tipoSolucion.length > 0 && (
          <Flex
            w={"60vw"}
            alignItems={"center"}
            bg={"#00468C"}
            p={"10px"}
            borderRadius={"10px"}
            color={"#fff"}
            mt={"15px"}
          >
            <Text>Tipos de soluciones seleccionados: </Text>
            <Flex overflowX={"scroll"} w={"100%"}>
              {insertTipoProblema.tipoSolucion &&
                insertTipoProblema.tipoSolucion.map((pro, i) => (
                  <Flex mb={"2px"} align={"center"} mx={"2px"} key={i}>
                    <Text
                      key={pro}
                      bg={"#fff"}
                      color={"#262626"}
                      borderRadius={"15px 0 0 15px"}
                      px={"4px"}
                      py={"2px"}
                    >
                      {pro}
                    </Text>
                    <Text
                      onClick={() => deleteTipoDe(pro,'tipoSolucion')}
                      bg={"#aaf"}
                      color={"#262626"}
                      borderRadius={"0 15px 15px 0"}
                      px={"8px"}
                      py={"5px"}
                      fontSize={"12px"}
                      fontWeight={"bold"}
                      cursor={"pointer"}
                    >
                      X
                    </Text>
                  </Flex>
                ))}
            </Flex>
          </Flex>
        )}

      <Flex
        w={"60vw"}
        alignItems={"center"}
        bg={"#00468C"}
        p={"10px"}
        borderRadius={"10px"}
        color={"#fff"}
        mt={"15px"}
      >
        <Text minW={"180px"} fontSize={"17px"} fontWeight={"bold"} me={"10px"}>
          Tipo de solucion
        </Text>
        <Select
          color={"#252525"}
          bg={"#FFF"}
          name="tipoSolucion"
          value={
            insertTipoProblema.tipoSolucion ? insertTipoProblema.tipoSolucion[0] : null
          }
          onChange={handleChange}
        >
          <option value={null}>Sin tipo de solucion</option>
          {config.tiposDeSoluciones.map((tp, i) => (
            <option value={tp} key={i}>
              {tp}
            </option>
          ))}
        </Select>
        <Flex
          bg={"#FFF"}
          borderRadius={"50%"}
          minW={"30px"}
          minH={"30px"}
          ms={"10px"}
          alignItems={"center"}
          justifyContent={"center"}
          cursor={"pointer"}
          _hover={{ opacity: 0.8 }}
        >
          <Text
            fontWeight={"bold"}
            fontSize={"20px"}
            color={"#00468C"}
            mt={"-3px"}
            onClick={sendNuevoTipoDeSolucion}
          >
            +
          </Text>
        </Flex>
      </Flex>
      <Button colorScheme="blue" mt={'10px'} size={'sm'} onClick={handleSave}>Guardar</Button>
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
                              key === 'tipoProblema' ?
                              Array.isArray(data[key]) && data[key].map((d,i)=>(
                                <Text
                                key={d}
                                bg={i%2==0?'#00468C':'#2255F8'}
                                px={'10px'}
                                borderRadius={'10px'}
                                color={'#fff'}
                                ms={'1px'}
                                >
                                  {d}
                                </Text>
                                  ))
                                :
                              key === 'tipoSolucion' ?
                              <>
                              {
                              Array.isArray(data[key]) && data[key].map((d,i)=>(
                                <Text
                                key={d}
                                bg={i%2==0?'#00468C':'#2255F8'}
                                px={'10px'}
                                borderRadius={'10px'}
                                color={'#fff'}
                                ms={'1px'}
                                >
                                  {d}
                                </Text>
                                  ))
                                }
                                <Text
                                bg={'#00468C'}
                                px={'10px'}
                                borderRadius={'10px'}
                                color={'#fff'}
                                ms={'1px'}
                                cursor={'pointer'}
                                onClick={()=>setInsertTipoProblema(data)}
                                >
                                  {"+"}
                                </Text>
                                  </>
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
