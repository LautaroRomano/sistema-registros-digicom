import { client } from "../../../dbconfig/db";
const { ObjectId } = require("bson");

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET":
        return await get(req, res);
      case "POST":
        return await post(req, res);
      case "PUT":
        return await put(req, res);
    }
  } catch (error) {
    console.log(error);
  }
}
const get = async (req, res) => {
  try {
    await client.connect();

    const result = await client
      .db("registrosDigicom")
      .collection("servicios")
      .find({})
      .sort({ inicioTarea: -1 })
      .toArray();

    // Obtener los IDs de los equipos no nulos
    const equipoIds = result
      .filter(servicio => servicio.equipo !== null)
      .map(servicio => new ObjectId(servicio.equipo));

    // Obtener la información de los equipos relacionados
    let equipos = []
    for (const key of [
      "equiposReconectador",
      "equiposCamaras",
      "equiposCMM",
      "equiposRebaje",
      "equiposSeccionador",
      "equiposTelgecs",
    ]) {
      const arr = await client
        .db("registrosDigicom")
        .collection(key)
        .find({ _id: { $in: equipoIds } })
        .toArray()
      equipos = equipos.concat(arr)
    }

    // Mapear los equipos a un objeto de ID -> equipo
    const equiposMap = equipos.reduce((map, equipo) => {
      map[equipo._id] = equipo;
      return map;
    }, {});

    // Asignar la información del equipo a cada servicio
    result.forEach(servicio => {
      if (servicio.equipo !== null) {
        servicio.equipo = equiposMap[servicio.equipo];
      }
    });

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  } finally {
    // await client.close();
  }
};

const post = async (req, res) => {
  try {
    await client.connect();
    const result = await client
      .db("registrosDigicom")
      .collection("servicios")
      .insertOne(req.body);

    for (const key of [
      "equiposReconectador",
      "equiposCamaras",
      "equiposCMM",
      "equiposRebaje",
      "equiposSeccionador",
      "equiposTelgecs",
    ]) {
      const equipo = await client
        .db("registrosDigicom")
        .collection(key)
        .find({ ["_id"]: new ObjectId(req.body.equipo) })
        .toArray();
      if (equipo.length > 0) {
        await client
          .db("registrosDigicom")
          .collection(key)
          .updateOne(
            { _id: new ObjectId(req.body.equipo) },
            {
              $set: {
                ["ultima_visita"]: Array.isArray(equipo[0].ultima_visita)
                  ? [getCurrentDate(), ...equipo[0].ultima_visita]
                  : [getCurrentDate()],
              },
            }
          );
      }
    }

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  } finally {
    // await client.close();
  }
};
const put = async (req, res) => {
  const { body } = req;
  try {
    await client.connect();
    const result = await client
      .db("registrosDigicom")
      .collection("servicios")
      .updateOne(
        { _id: new ObjectId(body._id) },
        { $set: { [body.keyData]: body.newData } }
      );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  } finally {
    // await client.close();
  }
};

const getCurrentDate = () => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};