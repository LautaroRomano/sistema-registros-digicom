import { connection } from "../../../dbconfig/db";
import { listEquipos } from "../../../equiposDigicomSeccionador";
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
        !relationAdministraciones.find(
          (rel) => normalizeText(rel.nombre) === normalizeText(equ)
        )
      ) {
        const [insertRes] = await connection.query(
          `INSERT INTO ADMINISTRACIONES VALUES(0,?)`,
          [equ]
        );
        relationAdministraciones.push({
          id_administracion: insertRes.insertId,
          nombre: equ,
          sucursales: [],
        });
      }
      const administracion = Array.isArray(relationAdministraciones)
        ? relationAdministraciones.find(
            (adm) => normalizeText(adm.nombre) === normalizeText(equipo[0])
          )
        : null;

      const sucursal = administracion
        ? Array.isArray(administracion.sucursales)
          ? administracion.sucursales.find(
              (suc) => normalizeText(suc.nombre) === normalizeText(equipo[1])
            )
          : null
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
        ? Array.isArray(sucursal.localidades)
          ? sucursal.localidades.find(
              (loc) => normalizeText(loc.nombre) === normalizeText(equipo[2])
            )
          : null
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
            if (suc && suc.id_sucursal === sucursal.id_sucursal)
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

    const newEquSec = {
      id_rtu: equipo[letters.K],
      id_radio: equipo[letters.L],
      id_master: equipo[letters.M],
      latitud_sur: equipo[letters.V],
      latitud_oeste: equipo[letters.W],
      orientacion_antena: equipo[letters.X],
      fecha_instalacion:
        equipo[letters.Y] == "2020-09-31" ? null : equipo[letters.Y],
      fecha_cambio_bateria: equipo[letters.Z],
      numero_serie: equipo[letters.AA],
      numero_serie_reemplazo: equipo[letters.AB],
      velocidad_rtu: equipo[letters.AC],
      canal_radio: equipo[letters.N],
      rpt_directo: equipo[letters.O],
      rpt_asociado: equipo[letters.P],
      v_prim: equipo[letters.Q],
      numero_serie_radio_modem: equipo[letters.AD],
      administracion: administraciones.find(
        (adm) => normalizeText(adm.nombre) == normalizeText(equipo[letters.B])
      )
        ? administraciones.find(
            (adm) =>
              normalizeText(adm.nombre) == normalizeText(equipo[letters.B])
          ).id_administracion
        : null,
      sucursal: sucursales.find(
        (suc) => normalizeText(suc.nombre) == normalizeText(equipo[letters.C])
      )
        ? sucursales.find(
            (suc) =>
              normalizeText(suc.nombre) == normalizeText(equipo[letters.C])
          ).id_sucursal
        : null,
      localidad: localidades.find(
        (loc) => normalizeText(loc.nombre) == normalizeText(equipo[letters.D])
      )
        ? localidades.find(
            (loc) =>
              normalizeText(loc.nombre) == normalizeText(equipo[letters.D])
          ).id_localidad
        : null,
      direccion: equipo[letters.E],
      observaciones: equipo[letters.AE],
      tipo_equipo: equipo[letters.F] === "Reconectador" ? 3 : 2,
      marca_modelo: equipo[letters.I],
      id_sistema: equipo[letters.J],
      nombre: equipo[letters.G],
      v_seccionador: equipo[letters.R],
      distribuidor: equipo[letters.S],
      piquete: equipo[letters.U],
      tipo: equipo[letters.F],
    };

    try {
      const [result] = await connection.query(
        `insert into configuracion values(0,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          newEquSec.id_rtu.match(/\d+/)
            ? newEquSec.id_rtu.match(/\d+/)[0]
            : null,
          newEquSec.id_master.match(/\d+/)
            ? newEquSec.id_master.match(/\d+/)[0]
            : null,
          newEquSec.latitud_sur,
          newEquSec.latitud_oeste,
          newEquSec.orientacion_antena.match(/\d+/)
            ? newEquSec.orientacion_antena.match(/\d+/)[0]
            : null,
          formatearFecha(newEquSec.fecha_instalacion),
          formatearFecha(newEquSec.cambio_bateria),
          newEquSec.numero_serie,
          newEquSec.numero_serie_reemplazo,
          newEquSec.velocidad_rtu.match(/\d+/)
            ? newEquSec.velocidad_rtu.match(/\d+/)[0]
            : null,
          newEquSec.canal_radio,
          newEquSec.rpt_directo,
          newEquSec.rpt_asociado,
          newEquSec.v_prim.match(/\d+/)
            ? newEquSec.v_prim.match(/\d+/)[0]
            : null,
          newEquSec.numero_serie_radio_modem,
          newEquSec.sucursal,
          newEquSec.localidad,
          newEquSec.direccion,
          newEquSec.administracion,
          newEquSec.observaciones,
          newEquSec.tipo_equipo,
          newEquSec.id_radio.match(/\d+/)
            ? newEquSec.id_radio.match(/\d+/)[0]
            : null,
        ]
      );
      const configID = result.insertId;
      await connection.query(
        `insert into equipos_seccionador values(0,?,?,?,?,?,?,?,?)`,
        [
          configID,
          newEquSec.nombre,
          newEquSec.marca_modelo,
          newEquSec.id_sistema.match(/\d+/)
            ? newEquSec.id_sistema.match(/\d+/)[0]
            : null,
          newEquSec.v_seccionador.match(/\d+/)
            ? newEquSec.v_seccionador.match(/\d+/)[0]
            : null,
          newEquSec.distribuidor,
          newEquSec.piquete,
          newEquSec.tipo_equipo,
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

const normalizeText = (text) => {
  const cadena = text.trim();

  // Convertir ambas cadenas a minúsculas y quitar acentos
  const cadenaSinAcentos = cadena
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  return cadenaSinAcentos.length > 0 ? cadenaSinAcentos : null;
};
