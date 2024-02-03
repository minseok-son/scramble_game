const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();

const port = 5000;

let score = 0;
let length = 3;
let word = "";
let scrambled = "";
let difficulty = "";

async function getRandomWord() {
  const response = await axios.get(
    `https://random-word-api.herokuapp.com/word?length=${length}`
  );

  word = response.data[0];
  scrambled = scramble(word);
}

function scramble(word) {
  const letters = word.split("");
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  return letters.join("");
}

app.use(cors());
app.use(bodyParser.json());

app.get("/api/getScore", async (req, res) => {
  res.json({ score: score });
  score = 0;
});

app.get("/api/getNewWord", async (req, res) => {
  if (difficulty === "easy") {
    length = Math.floor(Math.random() * 2 + 3);
  } else if (difficulty === "medium") {
    length = Math.floor(Math.random() * 2 + 5);
  } else if (difficulty === "hard") {
    length = Math.floor(Math.random() * 2 + 7);
  } else {
    length = 3;
  }
  console.log(score);
  await getRandomWord();
  console.log(word);
  res.json({ scrambled: scrambled });
});

app.post("/api/difficulty", (req, res) => {
  difficulty = req.body.difficulty;
});

app.post("/api/validateWord", (req, res) => {
  const guess = req.body.guess;
  if (guess.toLowerCase() === word) {
    res.status(200).send({ status: "correct" });
    score += 100 * length;
  } else {
    res.status(200).send({ status: "incorrect" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
