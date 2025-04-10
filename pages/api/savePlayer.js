import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ message: 'Name is required' });
    }

    try {
      const client = await clientPromise;
      const db = client.db();
      const playersCollection = db.collection('players');

      // Insert the player into the collection
      const result = await playersCollection.insertOne({ name });

      if (result.insertedId) {
        return res.status(200).json({ message: 'Player saved successfully' });
      } else {
        return res.status(500).json({ message: 'Failed to save player' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Database error', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
