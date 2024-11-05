import { MongoClient } from 'mongodb';

let uri = process.env.MONGODB_LOCAL;
let dbName = process.env.MONGODB_DB;

let cachedClient = null;
let cachedDB = null;

if (!uri) {
  throw new Error(
    'Please define the MONGODB_URI environment variable'
  );
}

if (!dbName) {
  throw new Error(
    'Please define the MONGODB_DB environment variable'
  );
}

export async function connectToDB() {
  if (cachedClient && cachedDB) {
    return { client: cachedClient, db: cachedDB };
  }

  const client = await MongoClient.connect(uri);

  const db = await client.db(dbName);

  cachedClient = client;
  cachedDB = db;

  return { client, db };
};
