import React, { useEffect, useState } from "react";
import { Flex, Text, Input, Select, Textarea, Button } from "@chakra-ui/react";
import axios from "axios";
import FormAddEquipoTelcecs from "./formsAddEquipos/FormAddEquipoTelgecs";
import FormAddEquipoSeccionador from "./formsAddEquipos/FormAddEquipoSeccionador";

const TIPOS_FALLAS = [
  "ALARMA",
  "MALA COMUNICACION",
  "SIN COMUNICACION",
  "SIN LECTURA",
  "OTROS",
];

const INPUTS_CONFIG = {
  id_rtu: {
    dataType: "number",
    placeholder: "Ingresa el ID de la RTU",
    text: "ID de RTU: ",
  },
  id_radio: {
    dataType: "number",
    placeholder: "Ingresa el ID de la Radio",
    text: "ID de Radio: ",
  },
  id_master: {
    dataType: "number",
    placeholder: "Ingresa el ID del master",
    text: "ID de Master: ",
  },
  latitud_sur: {
    dataType: "text",
    placeholder: "Ingresa la latitud sur",
    text: "Latitud sur: ",
  },
  latitud_oeste: {
    dataType: "text",
    placeholder: "Ingresa la latitud oeste",
    text: "Latitud oeste: ",
  },
  orientacion_antena: {
    dataType: "number",
    placeholder: "Ingresa la orientacion de la antena",
    text: "Orientacion antena: ",
  },
  fecha_instalacion: {
    dataType: "date",
    placeholder: "",
    text: "Fecha de instalacion: ",
  },
  fecha_cambio_bateria: {
    dataType: "date",
    placeholder: "",
    text: "Cambio bateria: ",
  },
  numero_serie: {
    dataType: "text",
    placeholder: "Ingresa el Numero de serie",
    text: "Numero serie: ",
  },
  numero_serie_reemplazo: {
    dataType: "text",
    placeholder: "Ingresa el Numero de serie de reemplazo",
    text: "Numero serie reemplazo: ",
  },
  velocidad_rtu: {
    dataType: "number",
    placeholder: "Ingresa la velocidad del RTU",
    text: "Velocidad de RTU: ",
  },
  canal_radio: {
    dataType: "number",
    placeholder: "Ingresa el canal de radio",
    text: "Canal radio: ",
  },
  rpt_directo: {
    dataType: "text",
    placeholder: "Ingresa el repetidor directo",
    text: "Repetidor directo: ",
  },
  rpt_asociado: {
    dataType: "text",
    placeholder: "Ingresa el repetidor asociado",
    text: "Repetidor asociado: ",
  },
  v_prim: {
    dataType: "number",
    placeholder: "Ingresa el voltaje primario",
    text: "Voltaje primario: ",
  },
  numero_serie_radio_modem: {
    dataType: "number",
    placeholder: "Ingresa el nro serie radio modem",
    text: "Nro serie Radio M",
  },
  administracion: {
    dataType: "number",
    placeholder: "Ingresa la administracion",
    text: "Administracion: ",
    type: "select",
  },
  sucursal: {
    dataType: "text",
    placeholder: "Ingresa la sucursal",
    text: "Sucursal: ",
    type: "select",
  },
  localidad: {
    dataType: "text",
    placeholder: "Ingresa la localidad",
    text: "localidad: ",
    type: "select",
  },
  direccion: {
    dataType: "text",
    placeholder: "Ingresa la direccion",
    text: "Direccion: ",
  },
  observaciones: {
    dataType: "textarea",
    placeholder: "Ingresa las observaciones",
    text: "Observaciones: ",
  },
  tipo_equipo: {
    dataType: "number",
    placeholder: "Ingresa el tipo de equipo",
    text: "Tipo de equipo: ",
    type: "select",
  },
};
const inputsKey = Object.keys(INPUTS_CONFIG);

const FormAddEquipo = ({ data, setData, postEquipo }) => {
  const [step, setStep] = useState(0);
  const [tiposEquipos, setTiposEquipos] = useState([]);
  const [administracionesList, setAdministracionesList] = useState([]);
  const [localidadesList, setLocalidadesList] = useState([]);
  const [sucursalesList, setSucursalesList] = useState([]);

  useEffect(() => {
    axios.get("/api/tiposequipos").then(({ data }) => {
      setTiposEquipos(data);
    });
    axios.get("/api/administraciones").then(({ data }) => {
      setAdministracionesList(data);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handlePostData = () => {
    postEquipo();
  };

  if (step === 1 && data.tipo_equipo === "1") {
    return (
      <FormAddEquipoTelcecs
        data={data}
        handleChangeMain={handleChange}
        handlePostData={handlePostData}
        setStep={setStep}
      />
    );
  }
  if (step === 1 && (data.tipo_equipo === "2" || data.tipo_equipo === "3")) {
    return (
      <FormAddEquipoSeccionador
        data={data}
        handleChangeMain={handleChange}
        handlePostData={handlePostData}
        setStep={setStep}
      />
    );
  }

  return (
    <Flex
      w={"100vw"}
      h="100vh"
      bg={"#0009"}
      justifyContent="center"
      alignItems={"center"}
      position="fixed"
      top={0}
      left="0"
      zIndex={10}
      flexDir="column"
    >
      <Flex
        w={"70%"}
        height="80%"
        bg={"white"}
        borderRadius="2xl"
        alignItems="center"
        flexDir={"column"}
        overflowY="scroll"
      >
        <Text fontWeight={"700"} my="15px">
          NUEVO EQUIPO
        </Text>
        <Flex w={"100%"} h="100%">
          {/* contiene los inputsBox izquierdos*/}
          <Flex w={"50%"} h="100%" flexDir="column" p={"10px"}>
            {inputsKey
              .map((key, i) => {
                if (
                  i <= (inputsKey.length - 1) / 2 &&
                  INPUTS_CONFIG[key].type === "select"
                )
                  return (
                    <Flex
                      w={"100%"}
                      bg={"white"}
                      alignItems="center"
                      justifyContent={"space-between"}
                      key={key}
                    >
                      <Text
                        w={"150px"}
                        m="10px"
                        fontWeight={"600"}
                        fontSize="13px"
                      >
                        {INPUTS_CONFIG[key].text}
                      </Text>
                      <Select
                        type={INPUTS_CONFIG[key].dataType}
                        name={key}
                        onChange={handleChange}
                        value={data[key]}
                        placeholder={INPUTS_CONFIG[key].placeholder}
                        size={"sm"}
                      >
                        {key === "administracion"
                          ? administracionesList.map((elem, i) => (
                              <option value={elem.id_administracion} key={i}>
                                {elem.nombre}
                              </option>
                            ))
                          : key === "sucursal"
                          ? sucursalesList.map((elem, i) => (
                              <option value={elem.id_sucursal} key={i}>
                                {elem.nombre}
                              </option>
                            ))
                          : key === "localidad"
                          ? localidadesList.map((elem, i) => (
                              <option value={elem.id_localidad} key={i}>
                                {elem.nombre}
                              </option>
                            ))
                          : key === "tipo_equipo" &&
                            tiposEquipos.map((eqp, i) => (
                              <option value={eqp.id_tipo_equipo} key={i}>
                                {eqp.nombre}
                              </option>
                            ))}
                      </Select>
                    </Flex>
                  );
                if (i <= (inputsKey.length - 1) / 2 && i <= 10)
                  return (
                    <Flex
                      w={"100%"}
                      bg={"white"}
                      alignItems="center"
                      justifyContent={"space-between"}
                      key={key}
                    >
                      <Text
                        w={"150px"}
                        m="10px"
                        fontWeight={"600"}
                        fontSize="13px"
                      >
                        {INPUTS_CONFIG[key].text}
                      </Text>
                      <Input
                        type={INPUTS_CONFIG[key].dataType}
                        name={key}
                        onChange={handleChange}
                        value={data[key]}
                        placeholder={INPUTS_CONFIG[key].placeholder}
                        size={"sm"}
                      />
                    </Flex>
                  );
              })
              .filter((f) => f !== undefined)}
          </Flex>
          {/* contiene los inputsBox derechos*/}
          <Flex w={"50%"} h="100%" flexDir="column" p={"10px"}>
            {inputsKey
              .map((key, i) => {
                if (
                  i > (inputsKey.length - 1) / 2 &&
                  INPUTS_CONFIG[key].type === "select"
                )
                  return (
                    <Flex
                      w={"100%"}
                      bg={"white"}
                      alignItems="center"
                      justifyContent={"space-between"}
                      key={key}
                    >
                      <Text
                        w={"150px"}
                        m="10px"
                        fontWeight={"600"}
                        fontSize="13px"
                      >
                        {INPUTS_CONFIG[key].text}
                      </Text>
                      <Select
                        disabled={
                          (key === "administracion" &&
                            administracionesList.length === 0) ||
                          (key === "sucursal" && sucursalesList.length === 0) ||
                          (key === "localidad" &&
                            localidadesList.length === 0) ||
                          (key === "tipo_equipo" && tiposEquipos.length === 0)
                        }
                        type={INPUTS_CONFIG[key].dataType}
                        name={key}
                        onChange={(e) => {
                          handleChange(e);
                          if (key === "administracion" && e.target.value)
                            axios
                              .get("/api/sucursales/" + e.target.value)
                              .then(({ data }) => {
                                setSucursalesList(data);
                              });
                          else if (
                            key === "administracion" &&
                            !e.target.value
                          ) {
                            setSucursalesList([]);
                            setLocalidadesList([]);
                          } else if (key === "sucursal" && e.target.value)
                            axios
                              .get("/api/localidades/" + e.target.value)
                              .then(({ data }) => {
                                setLocalidadesList(data);
                              });
                          else if (key === "sucursal" && !e.target.value) {
                            setLocalidadesList([]);
                          }
                        }}
                        value={data[key]}
                        placeholder={INPUTS_CONFIG[key].placeholder}
                        size={"sm"}
                      >
                        {key === "administracion"
                          ? administracionesList.map((elem, i) => (
                              <option value={elem.id_administracion} key={i}>
                                {elem.nombre}
                              </option>
                            ))
                          : key === "sucursal"
                          ? sucursalesList.map((elem, i) => (
                              <option value={elem.id_sucursal} key={i}>
                                {elem.nombre}
                              </option>
                            ))
                          : key === "localidad"
                          ? localidadesList.map((elem, i) => (
                              <option value={elem.id_localidad} key={i}>
                                {elem.nombre}
                              </option>
                            ))
                          : key === "tipo_equipo" &&
                            tiposEquipos.map((eqp, i) => (
                              <option value={eqp.id_tipo_equipo} key={i}>
                                {eqp.nombre}
                              </option>
                            ))}
                      </Select>
                    </Flex>
                  );
                if (i > (inputsKey.length - 1) / 2)
                  return (
                    <Flex
                      w={"100%"}
                      bg={"white"}
                      alignItems="center"
                      justifyContent={"space-between"}
                      key={key}
                    >
                      <Text
                        w={"150px"}
                        m="10px"
                        fontWeight={"600"}
                        fontSize="13px"
                      >
                        {INPUTS_CONFIG[key].text}
                      </Text>
                      <Input
                        type={INPUTS_CONFIG[key].dataType}
                        name={key}
                        onChange={handleChange}
                        value={data[key]}
                        placeholder={INPUTS_CONFIG[key].placeholder}
                        size={"sm"}
                      />
                    </Flex>
                  );
              })
              .filter((f) => f !== undefined)}
          </Flex>
        </Flex>
      </Flex>
      <Flex w={"70%"} mt="15px" justifyContent={"end"}>
        <Button me={"15px"} colorScheme="orange" onClick={() => setData(false)}>
          Cancelar
        </Button>
        {step === 0 ? (
          <Button colorScheme="blue" onClick={() => setStep((i) => i + 1)}>
            Continuar
          </Button>
        ) : (
          <Button colorScheme="blue" onClick={handlePostData}>
            Guardar
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default FormAddEquipo;
