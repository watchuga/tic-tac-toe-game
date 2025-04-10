import { clientPromise } from '../../lib/mongodb';



async function handler(req, res) {
  if (req.method === "POST") {
    const { name } = req.body;

    // Validate name
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    try {
      // Connect to the database
      const { db } = await connectToDatabase();

      // Insert the user's name into the 'players' collection
      const result = await db.collection("players").insertOne({ name });

      return res.status(200).json({ message: "Name saved successfully", player: result });
    } catch (error) {
      return res.status(500).json({ message: "Failed to save name", error: error.message });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}

export default handler;
