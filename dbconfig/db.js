import { createPool } from "mysql2/promise";

/* const connection = createPool({
  host: process.env.host,
  user: process.env.username,
  password: process.env.password,
  port: process.env.DB_PORT,
  database: process.env.database,
  ssl: {"rejectUnauthorized":true}
}); */

const connection = createPool({
  host: 'aws-sa-east-1.connect.psdb.cloud',
  user: 'g7vw6q708ddor9xy6ta8',
  password: 'pscale_pw_1Js6KLb5W4qUT5kbiWAYS8EDRydJ8iDAK8G8AHA0AJJ',
  port: 3306,
  database: 'sistemaregistrosdigicom',
  ssl: {"rejectUnauthorized":true}
});

export { connection };

