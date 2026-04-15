const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;

let client;
let db;

async function connectDB() {
  if (!uri) {
    throw new Error('MONGO_URI is not set');
  }

  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db('cloud_storage');
  }

  return db;
}

module.exports = {
  connectDB
};
