import { connection } from "../../../dbconfig/db";

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET":
        return await getTipoEquipos(req, res);
    }
  } catch (error) {
    console.log(error);
  }
}

const getTipoEquipos = async (req, res) => {
  try {
    const [result] = await connection.query(`select * from tipos_equipos`);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

const postServicios = async (req, res) => {
  const {
    fechaServicio,
    observacionesServicio,
    tipoServicio,
    tipoFalla,
    fechaSolucion,
    detalleFalla,
    detalleSolucion,
    observacionesFalla,
    solucionado,
    equipo,
  } = req.body;

  try {
    const [result] = await connection.query(
      `INSERT INTO servicios (id_equipo, fecha, tipo_servicio, observaciones) VALUES (?, ?, ?, ?)`,
      [
        equipo,
        fechaServicio,
        TIPOS_SERVICIOS[tipoServicio],
        observacionesServicio.length > 0
          ? observacionesServicio
          : "Sin observaciones.",
      ]
    );

    const idServicioInsertado = result.insertId;

    if (tipoServicio === "1")
      await connection.query(
        `INSERT INTO fallas (id_servicio, fecha_solucion, tipo_falla, detalle_falla, solucionado, detalle_solucion, observaciones) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          idServicioInsertado,
          fechaSolucion,
          TIPOS_FALLAS[tipoFalla],
          detalleFalla.length > 0 ? detalleFalla : "Sin detalle.",
          solucionado,
          detalleSolucion.length > 0 ? detalleSolucion : "Sin detalle.",
          observacionesFalla.length > 0
            ? observacionesFalla
            : "Sin observaciones.",
        ]
      );

    return res.status(200).json();
  } catch (error) {
    console.log(error);
    return res.status(405).json({ error });
  }
};
