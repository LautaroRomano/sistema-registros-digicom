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
  try {
    async function run() {
      try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        const result = await client.db("registrosDigicom").collection("config").find({}).toArray();
        res.status(200).json(result[0]);

      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
    }
    run().catch(console.dir);
  } catch (error) {
    console.log(error)
  }
};
