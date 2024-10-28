import { MongoClient } from 'mongodb';

let uri = process.env.MONGODB_URI;
let dbName = process.env.MONGODB_DB;

let cachedClient = null;
let chachedDB = null;

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

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifyiedTopology: true,
  });

  const db = await client.db(dbName);

  cachedClient = client;
  cachedDB = db;

  return { client, db };
};
