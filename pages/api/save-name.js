import { connectToDatabase } from '@/lib/mongodb'; // or '../../lib/mongodb'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const { db } = await connectToDatabase();
    await db.collection('players').insertOne({ name });

    return res.status(200).json({ message: 'Player saved' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
