// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/numberGuessingGame", {})
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const gameSchema = new mongoose.Schema({
  secretNumber: Number,
  predictedNumber: Number,
  result: String,
});

const Game = mongoose.model("Game", gameSchema);

const secretNumber = Math.floor(Math.random() * 100) + 1; // Generate a random number between 1 and 100

app.post("/guess", async (req, res) => {
  const { predictedNumber } = req.body;

  let result = "Lose";
  if (predictedNumber === secretNumber) {
    result = "Win";
  }

  const game = new Game({
    secretNumber,
    predictedNumber,
    result,
  });

  await game.save();
  res.json(game);
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
