import { MongoClient } from "mongodb";
const uri = "mongodb://root:43846366@localhost:27017/registrosDigicom";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export { client };
