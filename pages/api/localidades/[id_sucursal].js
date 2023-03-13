import { connection } from "../../../dbconfig/db";

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET":
        return await getAdministrations(req, res);
    }
  } catch (error) {
    console.log(error);
  }
}

const getAdministrations = async (req, res) => {
  const { id_sucursal } = req.query;
  try {
    const [result] = await connection.query(
      `select * from localidades where id_sucursal = ?`,
      [id_sucursal]
    );
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};
