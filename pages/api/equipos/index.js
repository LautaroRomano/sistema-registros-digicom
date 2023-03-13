import { connection } from "../../../dbconfig/db";

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET":
        return await getEquipos(req, res);
      case "POST":
        return await postEquipos(req, res);
      case "PUT":
        return await editarEquipo(req, res);
    }
  } catch (error) {
    console.log(error);
  }
}

const getEquipos = async (req, res) => {
  try {
    const [result] = await connection.query(`SELECT * FROM configuracion`);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
const editarEquipo = async (req, res) => {
  const { newData, keyData, id_equipo } = req.body;
  try {
    const [result] = await connection.query(
      `update configuracion join equipos_telgecs set `+keyData+` = ? 
    where configuracion.id_equipo = ? 
    AND equipos_telgecs.id_equipo = ?`,
      [newData, id_equipo, id_equipo]
    );
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

const postEquipos = async (req, res) => {
  try {
    const [result] = await connection.query(
      `insert into configuracion values(0,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        req.body.id_rtu,
        req.body.id_master,
        req.body.latitud_sur,
        req.body.latitud_oeste,
        req.body.orientacion_antena,
        req.body.fecha_instalacion,
        req.body.cambio_bateria,
        req.body.numero_serie,
        req.body.numero_serie_reemplazo,
        req.body.velocidad_rtu,
        req.body.canal_radio,
        req.body.rpt_directo,
        req.body.rpt_asociado,
        req.body.v_prim,
        req.body.numero_serie_radio_modem,
        req.body.sucursal,
        req.body.localidad,
        req.body.direccion,
        req.body.administracion,
        req.body.observaciones,
        req.body.tipo_equipo,
        req.body.id_radio,
      ]
    );
    const configID = result.insertId;
    await connection.query(
      `insert into equipos_telgecs values(1,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        configID,
        req.body.equipo_telgecs.configuracion,
        req.body.equipo_telgecs.t_m,
        req.body.equipo_telgecs.numero_serie_medidor,
        req.body.equipo_telgecs.id_modbus,
        req.body.equipo_telgecs.placa_radio_modem,
        req.body.equipo_telgecs.programa_radio_modem,
        req.body.equipo_telgecs.radio_modem_protegido,
        req.body.equipo_telgecs.capacidad_rtu,
        req.body.equipo_telgecs.nro_set,
        req.body.equipo_telgecs.codigo_caja,
      ]
    );
    return res.status(200).json({ state: "succes" });
  } catch (error) {
    console.log(error);
  }
};
