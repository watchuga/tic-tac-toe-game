import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // MongoDB URI stored in environment variable

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development, use a global variable so the MongoClient doesn't get instantiated multiple times
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, it's safe to not use global variables
  clientPromise = MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export const connectToDatabase = async () => {
  client = await clientPromise;
  const db = client.db();
  return { client, db };
};
