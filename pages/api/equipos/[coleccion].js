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
  const coleccion = req.query.coleccion
  const keys = ["equiposReconectador", "equiposCamaras", "equiposCMM", "equiposRebaje", "equiposSeccionador", "equiposTelgecs"]
  const tiposEquipos = ["RECONECTADOR", "CAMARA", "CMM", "REBAJE", "SECCIONADOR", "SET"]
  if (coleccion == 'all') {
    try {
      await client.connect();
      let result = []
      for (const [index, eq] of keys.entries()) {
        const data = await client
          .db("registrosDigicom")
          .collection(eq)
          .find({})
          .toArray();
        result = [...result, ...data.map(dat => ({ ...dat, tipoEquipo: tiposEquipos[index] }))];
      }
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
    } finally {
      await client.close();
    }
  }
  try {
    await client.connect();
    const result = await client
      .db("registrosDigicom")
      .collection(coleccion)
      .find({})
      .toArray();
    res.status(200).json(result.map(equ => ({
      ...equ,
      tipoEquipo: tiposEquipos[keys.findIndex(f => f === coleccion)],
      coleccion: coleccion
    })));

  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }

};

const post = async (req, res) => {
  const { coleccion } = req.query
  try {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      const result = await client
        .db("registrosDigicom")
        .collection(coleccion)
        .insertOne(req.body);
      res.status(200).json(result);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  } catch (error) {
    console.log(error);
  }
};
const put = async (req, res) => {
  const { collection } = req.query
  const { body } = req;
  try {
    try {
      await client.connect();
      const result = await client
        .db("registrosDigicom")
        .collection(collection+'')
        .updateOne(
          { _id: new ObjectId(body._id) },
          { $set: { [body.keyData]: body.newData } }
        );
      return res.status(200).json(result);
    } finally {
      await client.close();
    }
  } catch (error) {
    console.log(error);
  }
};
