// lib/mongodb.js

import { MongoClient } from "mongodb";

// Ensure the environment variable is set
const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cachedClient = null;
let cachedDb = null;

// MongoDB connection utility
async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    // Connect to the MongoDB client
    await client.connect();
    const db = client.db(); // You can specify the database name here, e.g. db("your-db-name")

    // Cache the client and db connection for future reuse
    cachedClient = client;
    cachedDb = db;

    console.log("Connected to MongoDB");
    return { client, db };
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    throw new Error("Failed to connect to MongoDB");
  }
}

export { connectToDatabase };
