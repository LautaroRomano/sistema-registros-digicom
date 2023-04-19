import { client } from "../../../dbconfig/db";

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
  client.connect((err) => {
    const collection = client.db("registrosDigicom").collection("config");
    collection
      .findOne({})
      .then((result) => {
        console.log(result);
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
    client.close();
  });
};
