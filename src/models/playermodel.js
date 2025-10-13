import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  score: { type: Number, required: true },
});

export const Player = mongoose.model("Player", playerSchema);
