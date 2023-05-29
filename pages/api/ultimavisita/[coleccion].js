import { client } from "../../../dbconfig/db";
const { ObjectId } = require("bson");

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "POST":
        return await post(req, res);
    }
  } catch (error) {
    console.log(error);
  }
}


const post = async (req, res) => {
  const { coleccion } = req.query
  const { body } = req;
  try {
    await client.connect();
    const result = await client
      .db("registrosDigicom")
      .collection(coleccion)
      .updateOne(
        { _id: new ObjectId(body._id) },
        { $set: { ["ultima_visita"]: Array.isArray(body.ultima_visita) ? [body.newfecha,...body.ultima_visita] : [body.newfecha] } }
      );
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json({});
  } finally {
    // await client.close();
  }
};
