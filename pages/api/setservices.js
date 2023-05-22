import { client } from "../../dbconfig/db";
const { ObjectId } = require("bson");

import { servicios } from "../../backups/servicios2020";

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
        const arr = servicios.map(ser => (ser.split(',')))

        await client.connect();
        for (const servicio of arr) {
            const fecha = new Date(servicio[0])
            await client
                .db("registrosDigicom")
                .collection('servicios')
                .insertOne({
                    "equipo": null,
                    "inicioTarea": fecha ? fecha.getTime() : null,
                    "tipoServicio": servicio[4] === "Si" || servicio[4] === "Sí" ? "CORRECTIVO" : "PREVENTIVO",
                    "seSoluciono": servicio[4],
                    "tipoProblema": [
                        servicio[2],
                    ],
                    "finTarea": fecha ? fecha.getTime() : null,
                    "solucion": servicio[5],
                    "observaciones": servicio[6]
                });
        }

        res.status(200).json({ succes: arr });

    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
    finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
};

