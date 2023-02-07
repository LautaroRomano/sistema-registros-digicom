import { connection } from "../../../dbconfig/db";

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET":
        return await getServicios(req, res);
    }
  } catch (error) {
    console.log(error);
  }
}

const getServicios = async (req, res) => {
  try {
    const [result] = await connection.query(`
        SELECT servicios.*, 
        fallas.id_falla, fallas.fecha_solucion, fallas.tipo_falla, fallas.detalle_falla, fallas.solucionado, fallas.detalle_solucion, 
        equipos.tipo_equipo, servicios.observaciones as 'observaciones_servicios', fallas.observaciones as 'observaciones_fallas' FROM servicios 
        LEFT JOIN fallas on fallas.id_servicio = servicios.id_servicio 
        LEFT JOIN equipos on servicios.id_equipo = equipos.id_equipo
        `);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
