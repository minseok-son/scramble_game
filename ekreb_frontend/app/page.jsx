"use client";

import Main from "@components/Main";
import InputController from "@components/InputController";
import LineTimer from "@components/LineTimer";
import StartModal from "@components/StartModal";
import EndModal from "@components/EndModal";
import { useState, useEffect } from "react";

const Home = () => {
  const [currentGuess, setCurrentGuess] = useState("");
  const [scrambled, setScrambled] = useState("");
  const [status, setStatus] = useState("default");
  const [isStartOpen, setIsStartOpen] = useState(true);
  const [isEndOpen, setIsEndOpen] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const [score, setScore] = useState(0);

  const wordLen = scrambled.length;
  const time = 59;

  useEffect(() => {
    if (!isStartOpen) {
      getNewWord();
    }
  }, [isStartOpen]);

  const getNewWord = async () => {
    const res = await fetch(`http://localhost:5000/api/getNewWord`);
    const data = await res.json();
    setScrambled(data.scrambled);
  };

  const validateGuess = async () => {
    const res = await fetch(`http://localhost:5000/api/validateWord`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ guess: currentGuess }),
    });

    const data = await res.json();

    return data;
  };

  const onChar = (value) => {
    if (currentGuess.length < wordLen) {
      setCurrentGuess(`${currentGuess}${value}`);
    }
  };

  const onDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1));
  };

  const onEnter = async () => {
    const res = await validateGuess();
    setStatus(res.status);

    if (res.status === "correct") {
      setTimeout(async () => {
        setCurrentGuess("");
        setStatus("default");
        await getNewWord();
      }, 1000);
    } else {
      setTimeout(() => {
        setStatus("default");
      }, 500);
    }
  };

  InputController({ onChar, onDelete, onEnter, isOver });

  return (
    <div className="w-full justify-center items-center flex-col">
      <h1 className="head_text text-center">ekreb</h1>

      <StartModal
        isStartOpen={isStartOpen}
        setIsStartOpen={setIsStartOpen}
        getNewWord={getNewWord}
      />

      <LineTimer
        initialDuration={time}
        setIsOver={setIsOver}
        setIsEndOpen={setIsEndOpen}
        isStartOpen={isStartOpen}
        setScore={setScore}
      />

      <Main
        scrambled={scrambled}
        guess={currentGuess}
        wordLen={wordLen}
        status={status}
      />

      <EndModal
        isEndOpen={isEndOpen}
        setIsEndOpen={setIsEndOpen}
        score={score}
      />
    </div>
  );
};

export default Home;
