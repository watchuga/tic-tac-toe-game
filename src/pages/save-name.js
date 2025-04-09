import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017/tic_tac_toemongodb+srv://janrappp23:Jinx09233239342@cluster0.mtoc0cv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Replace with your MongoDB URI
const dbName = "tic_tac_toe"; // Your database name

async function handler(req, res) {
  if (req.method === "POST") {
    const { playerName } = req.body;

    // Check if the player name is valid
    if (!playerName || playerName.trim() === "") {
      return res.status(400).json({ message: "Player name is required." });
    }

    try {
      const client = await MongoClient.connect(uri);
      const db = client.db(dbName);

      // Insert player name into a collection
      await db.collection("players").insertOne({ name: playerName });

      client.close();
      res.status(201).json({ message: "Player name saved!" });
    } catch (error) {
      res.status(500).json({ message: "Error saving player name." });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
}

export default handler;
