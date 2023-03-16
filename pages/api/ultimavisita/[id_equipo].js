import { connection } from "../../../dbconfig/db";
import { armarFecha } from "../../../components/functions";

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET":
        return await get(req, res);
    }
  } catch (error) {
    console.log(error);
  }
}

const get = async (req, res) => {
  const { id_equipo } = req.query;
  try {
    const [result] = await connection.query(
      `select * from ultima_visita where id_equipo = ? order by fecha desc`,
      [id_equipo]
    );

    return res
      .status(200)
      .json(result.map((dat) => ({ ...dat, fecha: armarFecha(dat.fecha) })));
  } catch (error) {
    console.log(error);
  }
};
