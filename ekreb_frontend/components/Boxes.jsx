import Box from "@components/Box";

const Boxes = ({ guess, wordLen, status }) => {
  const splitGuess = guess.split("");
  const emptyCells = Array.from(Array(wordLen - splitGuess.length));

  return (
    <div
      className={`flex justify-center mb-1 ${
        status === "incorrect" ? "animate-shakeX" : ""
      } ${status === "correct" ? "animate-shakeY" : ""}`}
    >
      {splitGuess.map((letter, i) => {
        return <Box key={i} value={letter} status={status} />;
      })}
      {emptyCells.map((_, i) => {
        return <Box key={i} status={status} />;
      })}
    </div>
  );
};

export default Boxes;
