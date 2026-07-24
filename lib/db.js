import { MongoClient } from 'mongodb';

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME || 'sutrakriti';
const globalForMongo = globalThis;

if (!MONGO_URL && process.env.NODE_ENV === 'production') {
  throw new Error('MONGO_URL must be configured in production');
}

const connectionString = MONGO_URL || 'mongodb://localhost:27017';
const client = globalForMongo.__mongoClient || new MongoClient(connectionString, {
  maxPoolSize: 10,
  minPoolSize: 0,
  maxIdleTimeMS: 30_000,
  serverSelectionTimeoutMS: 5_000,
  connectTimeoutMS: 5_000,
  retryWrites: true,
});

if (process.env.NODE_ENV !== 'production') globalForMongo.__mongoClient = client;

let databasePromise;

async function initializeDatabase(db) {
  await Promise.all([
    db.collection('products').createIndex({ slug: 1 }, { unique: true }),
    db.collection('products').createIndex({ category: 1, createdAt: -1 }),
    db.collection('orders').createIndex({ createdAt: -1 }),
    db.collection('customOrders').createIndex({ createdAt: -1 }),
    db.collection('contacts').createIndex({ createdAt: -1 }),
    db.collection('newsletter').createIndex({ email: 1 }, { unique: true }),
    db.collection('blog').createIndex({ slug: 1 }, { unique: true }),
    db.collection('blog').createIndex({ published: 1, createdAt: -1 }),
  ]);
  return db;
}

export async function connectToDatabase() {
  if (!databasePromise) {
    databasePromise = client.connect().then((connectedClient) => initializeDatabase(connectedClient.db(DB_NAME)));
  }
  const db = await databasePromise;
  return { client, db };
}

export async function getCollection(collectionName) {
  const { db } = await connectToDatabase();
  return db.collection(collectionName);
}
