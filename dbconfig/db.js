const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://root:43846366@cluster0.wu0qv.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export { client }