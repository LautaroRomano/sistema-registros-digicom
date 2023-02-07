import { connection } from "../../../dbconfig/db"


export default async function handler(req, res) {
    try {
        switch (req.method) {
            case 'GET':
                return await getEquipos(req, res)
        }
    } catch (error) {
        console.log(error)
    }
}

const getEquipos = async (req, res) => {
    try {
        const [result] = await connection.query(`SELECT * FROM equipos`);
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }
}

