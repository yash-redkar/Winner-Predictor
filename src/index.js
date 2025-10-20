import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { Player } from "./models/playermodel.js";
import { runTournament } from "./algorithms/tournament.js";
import { runTwoScan } from "./algorithms/twoScan.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);

// ✅ MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB is connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Generate random players
app.post("/api/players/generate", async (req, res) => {
  try {
    const { count = 2 } = req.body;

    // Delete old players before generating new ones
    await Player.deleteMany();

    const players = Array.from({ length: count }, (_, i) => ({
      name: `Player ${i + 1}`,
      score: Math.floor(Math.random() * 100),
    }));

    const savedPlayers = await Player.insertMany(players);
    res.json(savedPlayers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Add player manually
app.post("/api/players", async (req, res) => {
  try {
    const { name, score } = req.body;
    const player = await Player.create({ name, score });
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Get all players
app.get("/api/players", async (req, res) => {
  try {
    const players = await Player.find();
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Delete all players
app.delete("/api/players", async (req, res) => {
  try {
    await Player.deleteMany();
    res.json({ message: "All players deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Run winner algorithms
app.post("/api/run", async (req, res) => {
  try {
    const { method } = req.body;
    const players = await Player.find();

    if (players.length < 2) {
      return res.status(400).json({ message: "Need at least 2 players" });
    }

    let result;
    if (method === "tournament") {
      result = runTournament(players);
    } else if (method === "two-scan") {
      result = runTwoScan(players);
    } else {
      return res.status(400).json({ message: "Invalid method" });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Start the server
const PORT = process.env.PORT || 4075;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
