"use client";
import { useState, useEffect } from "react";

const LineTimer = ({
  initialDuration,
  setIsOver,
  setIsEndOpen,
  isStartOpen,
  setScore,
}) => {
  const [duration, setDuration] = useState(initialDuration);

  const getScore = async () => {
    const res = await fetch(`http://localhost:5000/api/getScore`);
    const data = await res.json();
    return data.score;
  };

  useEffect(() => {
    if (!isStartOpen) {
      if (duration <= -1) {
        setScore(getScore());
        setIsOver(true);
        setIsEndOpen(true);
      } else {
        setTimeout(() => {
          setDuration(duration - 1);
        }, 1000);
      }
    }
  }, [duration, setIsOver, setIsEndOpen, isStartOpen]);

  return (
    <div className=" flex justify-center">
      <div className="w-96 h-4 bg-slate-100 rounded-md overflow-hidden mt-2">
        <div
          className=" h-full bg-green-400 transition-width ease-linear duration-1000"
          style={{ width: `${(duration / initialDuration) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default LineTimer;
