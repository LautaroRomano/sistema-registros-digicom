import { connection } from "../../../dbconfig/db";

const TIPOS_SERVICIOS = { 0: "PREVENTIVO", 1: "CORRECTIVO" };
const TIPOS_FALLAS = {
  0: "ALARMA",
  1: "MALA COMUNICACION",
  3: "SIN COMUNICACION",
  4: "SIN LECTURA",
  2: "OTROS",
};

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET":
        return await getServicios(req, res);
      case "POST":
        return await postServicios(req, res);
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
        ORDER BY servicios.fecha DESC
        `);
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
