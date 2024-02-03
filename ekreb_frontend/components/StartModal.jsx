const StartModal = ({ isStartOpen, setIsStartOpen }) => {
  if (!isStartOpen) return;

  const handleClick = async (value) => {
    setIsStartOpen(false);
    await setDifficulty(value);
  };

  const setDifficulty = async (value) => {
    const res = await fetch(`http://localhost:5000/api/difficulty`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ difficulty: value }),
    });
  };

  return (
    <div className="fixed w-full h-full bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-[999] left-0 top-0">
      <div className="bg-[white] shadow-[0px_0px_10px_rgba(0,0,0,0.5)] p-5 rounded-[5px] flex justify-center items-center  w-auto h-auto">
        <div className="flex-col justify-center items-center">
          <p className="text-center pb-2 font-semibold">
            You have a minute to try to unscramble as much words as you can!{" "}
            <br /> You will receive 100 points multiplied by the length of the
            scrambled word for each correct guess!
          </p>
          <div className="flex justify-evenly">
            <button
              className="start-btn"
              onClick={() => {
                handleClick("easy");
              }}
            >
              Easy
            </button>
            <button
              className="start-btn"
              onClick={() => {
                handleClick("medium");
              }}
            >
              Medium
            </button>
            <button
              className="start-btn"
              onClick={() => {
                handleClick("hard");
              }}
            >
              Hard
            </button>
          </div>
          {/* <div className="flex justify-center pt-2">
            <button
              className="start-btn"
              onClick={() => {
                handleClick(false);
              }}
            >
              Start
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default StartModal;
