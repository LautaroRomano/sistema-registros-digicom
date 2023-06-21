import { useRouter } from "next/router";
import { Flex, Text } from "@chakra-ui/layout";
import ViewPDF from "../../components/createpdf/ViewPDF";
import { useEffect, useState } from "react";
import axios from "axios";

const Planilla = () => {
  const router = useRouter();
  const [_id, coleccion] = router.query.urlData ? router.query.urlData : [0, 0];
  const [equipodata, setEquipoData] = useState(null);
  const [equipoServicios, setEquipoServicios] = useState(null);

  useEffect(() => {
    if (_id === 0) return;
    axios
      .get(`/api/equipo/${_id}/${coleccion}`)
      .then(({ data }) => setEquipoData(data[0]));
    axios
      .get(`/api/servicios/${_id}`)
      .then(({ data }) => setEquipoServicios(data[0]));
  }, [_id]);

  return <Flex>{equipodata && equipoServicios && <ViewPDF data={equipodata} servicios={equipoServicios}/>}</Flex>;
};

export default Planilla;
