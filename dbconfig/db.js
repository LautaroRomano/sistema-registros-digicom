const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb://127.0.0.1:27017/registrosDigicom";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export { client }