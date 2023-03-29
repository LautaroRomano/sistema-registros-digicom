import { connection } from "../../../../dbconfig/db";

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET":
        return await get(req, res);
      case "POST":
        return await post(req, res);
    }
  } catch (error) {
    console.log(error);
  }
}

const get = async (req, res) => {
  try {
    const [result] = await connection.query(`select * from servicios_detalles`);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

const post = async (req, res) => {
  const { detalle } = req.body;

  try {
    const [result] = await connection.query(
      `INSERT INTO servicios_detalles VALUES (0, ?)`,
      detalle
    );

    return res.status(200).json();
  } catch (error) {
    console.log(error);
    return res.status(405).json({ error });
  }
};
