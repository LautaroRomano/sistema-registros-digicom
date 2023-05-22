import { useEffect, useState } from "react";
import { Flex, Image, Text, Button } from "@chakra-ui/react";
import SettingsIcon from "@mui/icons-material/Settings";
import ViewConfig from "../components/ViewConfig";
import SelectR from "react-select";
import axios from "axios";
import Swal from "sweetalert2";
import NuevoServicio from "../components/NuevoServicio";
import Navbar from "../components/Navbar";

export default function Home() {
  const [viewConfig, setViewConfig] = useState(false);
  const handleChangeViewConfig = () => setViewConfig((state) => !state);
  const [newService, setNewService] = useState(false);
  const [newServiceData, setNewServiceData] = useState({});
  const [searchEquipo, setSearchEquipo] = useState({});
  const [equipos, setEquipos] = useState([]);
  const [config, setConfig] = useState({});

  const handleChange = ({ target }) => {
    const { name, value } = target;
    if (value === 'Sin tipo de problema') return
    if (name === 'tipoProblema')
      setNewServiceData((state) => ({ ...state, [name]: state[name] ? [...state[name], value] : [value] }));
    else
      setNewServiceData((state) => ({ ...state, [name]: value }));
  };

  const deleteTipoProblema = (tp) => {
    const name = 'tipoProblema'
    setNewServiceData((state) => ({ ...state, [name]: state[name] ? state[name].filter(f => f !== tp) : [] }));
  }

  const handleChangeSearchEquipo = ({ target }) => {
    const { name, value } = target;
    setSearchEquipo((state) => ({ ...state, [name]: value }));
  };

  useEffect(() => {
    getConfig();
    axios.get(`/api/equipos/all`).then((res) => {
      setEquipos(res.data);
    });
  }, []);

  const getConfig = () => {
    axios.get(`/api/getconfig`).then((res) => {
      setConfig(res.data);
    });
  };

  const postNewService = () => {
    const now = new Date();
    axios
      .post("/api/servicios", {
        ...newServiceData,
        finTarea: now.getTime(),
      })
      .then(({ data }) => {
        setNewService(false);
        setNewServiceData({});
      });
  };

  return (
    <Flex w={"100vw"} h="100vh" alignItems="center" flexDir={"column"}>
      {viewConfig && (
        <ViewConfig handleChangeViewConfig={handleChangeViewConfig} />
      )}
      <Navbar />
      {newService ? (
        <NuevoServicio
          setNewService={setNewService}
          config={config}
          getConfig={getConfig}
          equipo={newServiceData.equipo}
          newServiceData={newServiceData}
          handleChange={handleChange}
          postNewService={postNewService}
          deleteTipoProblema={deleteTipoProblema}
        />
      ) : (
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
            justifyContent={"end"}
            alignItems="center"
            bg={"#fff"}
            border="none"
          >
            <Text
              _hover={{ bg: "#acacac" }}
              borderRadius={"35%"}
              p={"5px"}
              onClick={handleChangeViewConfig}
              cursor={"pointer"}
            >
              <SettingsIcon />
            </Text>
          </Flex>
          <Flex
            h={"100%"}
            flexDir={"column"}
            w={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text fontWeight={"bold"} color={"#00468C"}>
              BUSCA UN EQUIPO:{" "}
            </Text>
            <Flex
              bg={"#00468C"}
              borderRadius={"10px"}
              p={"5px"}
              w={"40vw"}
              my={"3px"}
            >
              {config.administraciones && (
                <Flex alignItems={"center"}>
                  <Text
                    fontWeight={"bold"}
                    color={"#fff"}
                    mx={"5px"}
                    w={"120px"}
                  >
                    Administracion:{" "}
                  </Text>
                  <SelectR
                    placeholder="Administración"
                    name="administracion"
                    onChange={({ value }) => {
                      handleChangeSearchEquipo({
                        target: { name: "administracion", value: value },
                      });
                    }}
                    options={config.administraciones.map((admin) => ({
                      value: admin,
                      label: admin,
                    }))}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        width: "25vw",
                      }),
                    }}
                  />
                </Flex>
              )}
            </Flex>
            <Flex
              bg={"#00468C"}
              borderRadius={"10px"}
              p={"5px"}
              w={"40vw"}
              my={"3px"}
            >
              {config.sucursales && (
                <Flex alignItems={"center"}>
                  <Text
                    fontWeight={"bold"}
                    color={"#fff"}
                    mx={"5px"}
                    w={"120px"}
                  >
                    Sucursal:{" "}
                  </Text>
                  <SelectR
                    placeholder="Sucursal"
                    name="sucursal"
                    onChange={({ value }) => {
                      handleChangeSearchEquipo({
                        target: { name: "sucursal", value: value },
                      });
                    }}
                    options={config.sucursales.map((suc) => ({
                      value: suc,
                      label: suc,
                    }))}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        width: "25vw",
                      }),
                    }}
                  />
                </Flex>
              )}
            </Flex>
            <Flex
              bg={"#00468C"}
              borderRadius={"10px"}
              p={"5px"}
              w={"40vw"}
              my={"3px"}
            >
              {config.sucursales && (
                <Flex alignItems={"center"}>
                  <Text
                    fontWeight={"bold"}
                    color={"#fff"}
                    mx={"5px"}
                    w={"120px"}
                  >
                    Localidad:{" "}
                  </Text>
                  <SelectR
                    placeholder="Localidad"
                    name="localidad"
                    onChange={({ value }) => {
                      handleChangeSearchEquipo({
                        target: { name: "localidad", value: value },
                      });
                    }}
                    options={config.localidades.map((loc) => ({
                      value: loc,
                      label: loc,
                    }))}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        width: "25vw",
                      }),
                    }}
                  />
                </Flex>
              )}
            </Flex>
            <Flex
              bg={"#00468C"}
              borderRadius={"10px"}
              p={"5px"}
              w={"40vw"}
              my={"3px"}
            >
              {config.tiposEquipos && (
                <Flex alignItems={"center"}>
                  <Text
                    fontWeight={"bold"}
                    color={"#fff"}
                    mx={"5px"}
                    w={"120px"}
                  >
                    Tipo de Equipo:{" "}
                  </Text>
                  <SelectR
                    placeholder="Tipo equipo"
                    name="tipoEquipo"
                    onChange={({ value }) => {
                      handleChangeSearchEquipo({
                        target: { name: "tipoEquipo", value: value },
                      });
                    }}
                    options={config.tiposEquipos.map((tipo) => ({
                      value: tipo,
                      label: tipo,
                    }))}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        width: "25vw",
                      }),
                    }}
                  />
                </Flex>
              )}
            </Flex>
            <Text fontWeight={"bold"} color={"#00468C"}>
              SELECCIONA UN EQUIPO*:{" "}
            </Text>
            <Flex
              bg={"#00468C"}
              borderRadius={"10px 10px 0 0"}
              p={"5px"}
              w={"40vw"}
              my={"3px"}
            >
              {equipos && (
                <Flex alignItems={"center"}>
                  <Text
                    fontWeight={"bold"}
                    color={"#fff"}
                    mx={"5px"}
                    w={"120px"}
                  >
                    Equipo:{" "}
                  </Text>
                  <SelectR
                    placeholder="Equipo"
                    name="equipo"
                    onChange={({ value }) => {
                      handleChangeSearchEquipo({
                        target: { name: "equipo", value: value },
                      });
                    }}
                    options={equipos
                      .map((equ) => {
                        if (
                          searchEquipo.administracion &&
                          equ.administracion != searchEquipo.administracion
                        )
                          return;
                        if (
                          searchEquipo.sucursal &&
                          equ.sucursal != searchEquipo.sucursal
                        )
                          return;
                        if (
                          searchEquipo.localidad &&
                          equ.localidad != searchEquipo.localidad
                        )
                          return;
                        if (
                          searchEquipo.tipoEquipo &&
                          equ.tipo_equipo != searchEquipo.tipoEquipo
                        )
                          return;

                        return {
                          value: equ._id,
                          label: `${equ.tipoEquipo}: ` + (equ.nro_set ? equ.nro_set : equ.nombre ? equ.nombre : "Sin asignar"),
                        };
                      })
                      .filter((equ) => equ !== undefined)}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        width: "25vw",
                      }),
                    }}
                  />
                </Flex>
              )}
            </Flex>
            <Flex
              bg={"#00468C"}
              borderRadius={"0 0 10px 10px"}
              p={"5px"}
              w={"40vw"}
              mt={"-3px"}
              justifyContent={"center"}
            >
              <Button
                colorScheme={
                  !newService && searchEquipo.equipo ? "blue" : "gray"
                }
                onClick={
                  !newService && searchEquipo.equipo
                    ? () => {
                      Swal.fire({
                        title: "Quiere iniciar un nuevo servicio?",
                        showCancelButton: "Cancelar",
                        confirmButtonText: "Comenzar",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          const now = new Date();
                          setNewServiceData({
                            equipo: searchEquipo.equipo,
                            inicioTarea: now.getTime(),
                            tipoServicio: "PREVENTIVO",
                            seSoluciono: "Sí",
                          });
                          setNewService(true);
                        }
                      });
                    }
                    : () => { }
                }
              >
                Nuevo servicio
              </Button>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}

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
