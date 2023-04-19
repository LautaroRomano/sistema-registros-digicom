import { connection } from "../../../../dbconfig/db";
import { armarFecha } from "../../../../components/functions";

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET":
        return await getEquipos(req, res);
    }
  } catch (error) {
    console.log(error);
  }
}

const getEquipos = async (req, res) => {
  try {
    let i = 0;
    let [result] = await connection.query(`
    SELECT eq.*,sec.*, ad.nombre as 'administracion', lo.nombre as 'localidad', su.nombre as 'sucursal'
    FROM configuracion as eq
    JOIN equipos_seccionador as sec on sec.id_equipo = eq.id_equipo
    LEFT JOIN administraciones as ad on eq.administracion = ad.id_administracion
    LEFT JOIN localidades as lo on eq.localidad = lo.id_localidad
    LEFT JOIN sucursales as su on eq.sucursal = su.id_sucursal
    `);
    for (let re of result) {
      if (re.fecha_instalacion)
        result[i].fecha_instalacion = armarFecha(re.fecha_instalacion);
      if (re.cambio_bateria)
        result[i].cambio_bateria = armarFecha(re.cambio_bateria);
      i++;
    }
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
