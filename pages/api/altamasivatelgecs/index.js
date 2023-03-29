import { connection } from "../../../dbconfig/db";
import { listEquipos } from "../../../equiposDigicomTelgecs";
import { letters } from "./leters";

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
  const [administraciones] = await connection.query(
    `select * from administraciones`
  );
  const [sucursales] = await connection.query(`select * from sucursales`);
  const [localidades] = await connection.query(`select * from localidades`);

  let relationAdministraciones = [];
  let relationSucursales = [];

  for (const suc of sucursales) {
    const newsuc = {
      ...suc,
      localidades: localidades.filter(
        (loc) => suc.id_sucursal === loc.id_sucursal
      ),
    };
    relationSucursales.push(newsuc);
  }

  administraciones.forEach((adm) => {
    const newadm = {
      ...adm,
      sucursales: relationSucursales.filter(
        (suc) => adm.id_administracion === suc.id_administracion
      ),
    };
    relationAdministraciones.push(newadm);
  });

  for (const eq of listEquipos) {
    const equipo = eq.split(";");
    let i = 0;
    for (const equ of equipo) {
      if (
        equ &&
        i === 0 &&
        !relationAdministraciones.find((rel) => rel.nombre === equ)
      ) {
        const [insertRes] = await connection.query(
          `INSERT INTO ADMINISTRACIONES VALUES(0,?)`,
          [equ]
        );
        relationAdministraciones.push({
          id_administracion: insertRes.insertId,
          nombre: equ,
        });
      }
      const administracion = relationAdministraciones.find(
        (adm) => adm.nombre === equipo[0]
      );

      const sucursal = administracion
        ? administracion.sucursales.find((suc) => suc.nombre === equipo[1])
        : null;

      if (equ && i === 1 && administracion && !sucursal && equ.length > 3) {
        const [insertRes] = await connection.query(
          `INSERT INTO SUCURSALES VALUES(0,?,?)`,
          [administracion.id_administracion, equ]
        );
        relationAdministraciones = relationAdministraciones.map((admin) => ({
          ...admin,
          sucursales: [
            ...admin.sucursales,
            {
              id_sucursal: insertRes.insertId,
              id_administracion: admin.id_administracion,
              nombre: equ,
            },
          ],
        }));
      }

      const localidad = sucursal
        ? sucursal.localidades.find((loc) => loc.nombre === equipo[2])
        : null;
      if (
        equ &&
        i === 2 &&
        sucursal &&
        Array.isArray(sucursal.localidades) &&
        !localidad &&
        equ.length > 3
      ) {
        const [insertRes] = await connection.query(
          `INSERT INTO LOCALIDADES VALUES(0,?,?)`,
          [sucursal.id_sucursal, equ]
        );
        relationAdministraciones = relationAdministraciones.map((admin) => ({
          ...admin,
          sucursales: admin.sucursales.map((suc) => {
            if (suc.id_sucursal === sucursal.id_sucursal)
              return {
                ...suc,
                localidades: [
                  ...suc.localidades,
                  {
                    id_localidad: insertRes.insertId,
                    id_sucursal: sucursal.id_sucursal,
                    nombre: equ,
                  },
                ],
              };
            else return suc;
          }),
        }));
      }

      i++;
    }

    const newEquTelgecs = {
      id_rtu: equipo[letters.O],
      id_radio: equipo[letters.Q],
      id_master: equipo[letters.R],
      latitud_sur: equipo[letters.S],
      latitud_oeste: equipo[letters.T],
      orientacion_antena: equipo[letters.U],
      fecha_instalacion: equipo[letters.V],
      fecha_cambio_bateria: equipo[letters.W],
      numero_serie: equipo[letters.X],
      numero_serie_reemplazo: equipo[letters.Y],
      velocidad_rtu: equipo[letters.AD],
      canal_radio: equipo[letters.L],
      rpt_directo: equipo[letters.M],
      rpt_asociado: equipo[letters.N],
      v_prim: equipo[letters.H],
      numero_serie_radio_modem: equipo[letters.AA],
      administracion: administraciones.find(
        (adm) => adm.nombre == equipo[letters.A]
      )
        ? administraciones.find((adm) => adm.nombre == equipo[letters.A])
            .id_administracion
        : null,
      sucursal: sucursales.find((suc) => suc.nombre == equipo[letters.B])
        ? sucursales.find((suc) => suc.nombre == equipo[letters.B]).id_sucursal
        : null,
      localidad: localidades.find((loc) => loc.nombre == equipo[letters.C])
        ? localidades.find((loc) => loc.nombre == equipo[letters.C])
            .id_localidad
        : null,
      direccion: equipo[letters.D],
      observaciones: equipo[letters.AF],
      tipo_equipo: 1,
      nro_set: equipo[letters.E],
      codigo_caja: equipo[letters.F],
      configuracion: equipo[letters.I],
      t_m: equipo[letters.J],
      numero_serie_medidor: equipo[letters.K],
      id_modbus: equipo[letters.P],
      placa_radio_modem: equipo[letters.Z],
      programa_radio_modem: equipo[letters.AB],
      radio_modem_protegido: equipo[letters.AC],
      capacidad_rtu: equipo[letters.AE],
    };

    try {
      const [result] = await connection.query(
        `insert into configuracion values(0,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          newEquTelgecs.id_rtu.match(/\d+/)
            ? newEquTelgecs.id_rtu.match(/\d+/)[0]
            : null,
          newEquTelgecs.id_master.match(/\d+/)
            ? newEquTelgecs.id_master.match(/\d+/)[0]
            : null,
          newEquTelgecs.latitud_sur,
          newEquTelgecs.latitud_oeste,
          newEquTelgecs.orientacion_antena.match(/\d+/)
            ? newEquTelgecs.orientacion_antena.match(/\d+/)[0]
            : null,
          formatearFecha(newEquTelgecs.fecha_instalacion),
          formatearFecha(newEquTelgecs.cambio_bateria),
          newEquTelgecs.numero_serie,
          newEquTelgecs.numero_serie_reemplazo,
          newEquTelgecs.velocidad_rtu.match(/\d+/)
            ? newEquTelgecs.velocidad_rtu.match(/\d+/)[0]
            : null,
          newEquTelgecs.canal_radio,
          newEquTelgecs.rpt_directo,
          newEquTelgecs.rpt_asociado,
          newEquTelgecs.v_prim.match(/\d+/)
            ? newEquTelgecs.v_prim.match(/\d+/)[0]
            : null,
          newEquTelgecs.numero_serie_radio_modem,
          newEquTelgecs.sucursal,
          newEquTelgecs.localidad,
          newEquTelgecs.direccion,
          newEquTelgecs.administracion,
          newEquTelgecs.observaciones,
          newEquTelgecs.tipo_equipo,
          newEquTelgecs.id_radio.match(/\d+/)
            ? newEquTelgecs.id_radio.match(/\d+/)[0]
            : null,
        ]
      );
      const configID = result.insertId;
      await connection.query(
        `insert into equipos_telgecs values(0,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          configID,
          newEquTelgecs.configuracion,
          newEquTelgecs.t_m,
          newEquTelgecs.numero_serie_medidor,
          newEquTelgecs.id_modbus.match(/\d+/)
            ? newEquTelgecs.id_modbus.match(/\d+/)[0]
            : null,
          newEquTelgecs.placa_radio_modem,
          newEquTelgecs.programa_radio_modem,
          newEquTelgecs.radio_modem_protegido,
          newEquTelgecs.capacidad_rtu.match(/\d+/)
            ? newEquTelgecs.capacidad_rtu.match(/\d+/)[0]
            : null,
          newEquTelgecs.nro_set,
          newEquTelgecs.codigo_caja,
        ]
      );
    } catch (err) {
      console.log({ err });
    }
  }

  return res.status(200).json({ relationAdministraciones });
};

const formatearFecha = (fechaString) => {
  if (!fechaString) return null;
  const partesFecha = fechaString.split("/");
  if (partesFecha.length === 3) {
    const year = partesFecha[2].match(/\d+/);
    const month = partesFecha[1].match(/\d+/);
    const day = partesFecha[0].match(/\d+/);
    if (!year || !month || !day) return null;
    const fechaFormateada = `${year[0]}-${month[0]}-${day[0]}`;
    return fechaFormateada;
  } else return null;
};
