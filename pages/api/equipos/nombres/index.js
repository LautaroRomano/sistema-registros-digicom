import { connection } from "../../../../dbconfig/db";

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET":
        return await getNombreEquipos(req, res);
    }
  } catch (error) {
    console.log(error);
  }
}

const getNombreEquipos = async (req, res) => {
  try {
    const [result] = await connection.query(`
    SELECT eq.id_equipo, tg.nro_set as 'nombreTelgecs', sc.nombre as 'nombreSeccionador', rc.nombre as 'nombreReconectador' 
    FROM configuracion as eq
    LEFT JOIN equipos_telgecs as tg on tg.id_equipo = eq.id_equipo
    LEFT JOIN equipos_seccionador as sc on sc.id_equipo = eq.id_equipo
    LEFT JOIN equipos_reconectador as rc on rc.id_equipo = eq.id_equipo;
    `);
    const newRes = result.map((val) => ({
      ...val,
      nombre:
        val.nombreReconectador ||
        val.nombreSeccionador ||
        val.nombreTelgecs ||
        "NULL",
    }));
    return res.status(200).json(newRes);
  } catch (error) {
    console.log(error);
  }
};
