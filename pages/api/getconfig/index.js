import { client } from "../../../dbconfig/db";
const { ObjectId } = require("bson");

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET":
        return await get(req, res);
      case "PUT":
        return await put(req, res);
    }
  } catch (error) {
    console.log(error);
  }
}
const get = async (req, res) => {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      const result = await client
        .db("registrosDigicom")
        .collection("config")
        .find({})
        .toArray();
      res.status(200).json(result[0]);
    } catch (error) {
      console.log(error);
    }
    finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
};

const put = async (req, res) => {
  const { body } = req;
  console.log(body);
  try {
    await client.connect();
    const result = await client
      .db("registrosDigicom")
      .collection("config")
      .updateOne(
        { _id: new ObjectId(body._id) },
        { $set: { [body.field]: body.newData } }
      );
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
};
