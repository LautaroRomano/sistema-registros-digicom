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
  const { id_equipo } = req.query;
  try {
    await client.connect();

    const result = await client
      .db("registrosDigicom")
      .collection("servicios")
      .find({ equipo: id_equipo })
      .sort({ inicioTarea: -1 })
      .toArray();

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  } finally {
    // await client.close();
  }
};
