import { client } from "../../../dbconfig/db";
const { ObjectId } = require("bson");

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
  const [id,coleccion] = req.query.data
  const keys = ["equiposReconectador", "equiposCamaras", "equiposCMM", "equiposRebaje", "equiposSeccionador", "equiposTelgecs"]
  const tiposEquipos = ["RECONECTADOR", "CAMARA", "CMM", "REBAJE", "SECCIONADOR", "SET"]
 
  try {
    await client.connect();
    const result = await client
      .db("registrosDigicom")
      .collection(coleccion)
      .find({_id: new ObjectId(id)})
      .toArray();
    res.status(200).json(result.map(equ => ({
      ...equ,
      tipoEquipo: tiposEquipos[keys.findIndex(f => f === coleccion)],
      coleccion: coleccion
    })));

  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }

};
