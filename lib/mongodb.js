import clientPromise from '../lib/mongodb'; // ✅ one level up


const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!uri) throw new Error('Please define the MONGODB_URI environment variable');

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
