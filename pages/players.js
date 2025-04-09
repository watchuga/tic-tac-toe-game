import clientPromise from '../lib/mongodb';  // Correct path if players.js is in /pages


export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  if (req.method === 'POST') {
    // Save player name to MongoDB
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    try {
      const playersCollection = db.collection('players');
      const result = await playersCollection.insertOne({ name });
      res.status(200).json({ id: result.insertedId, name });
    } catch (error) {
      res.status(500).json({ message: 'Error saving player name' });
    }
  } else if (req.method === 'GET') {
    // Retrieve all players
    try {
      const playersCollection = db.collection('players');
      const players = await playersCollection.find({}).toArray();
      res.status(200).json(players);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving players' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
