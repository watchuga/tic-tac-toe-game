import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development, it's safe to use a global variable to store the client promise
  // to avoid creating too many connections to MongoDB.
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, it's better to not use a global variable
  clientPromise = client.connect();
}

export { clientPromise }; // Named export
