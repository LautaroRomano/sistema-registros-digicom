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

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
  finally {
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
