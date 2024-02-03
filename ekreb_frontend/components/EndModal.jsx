const EndModal = ({ isEndOpen, setIsEndOpen, score }) => {
  if (!isEndOpen) return;

  return (
    <div className="fixed w-full h-full bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-[999] left-0 top-0">
      <div className="bg-[white] shadow-[0px_0px_10px_rgba(0,0,0,0.5)] p-5 rounded-[5px] relative w-auto h-auto">
        <button
          className="absolute text-xl cursor-pointer border-[none] right-2 top-0 background: none"
          onClick={() => {
            setIsEndOpen(false);
          }}
        >
          &times;
        </button>
        <div className="flex-col justify-center items-center">
          <h2 className="text-center py-2">You got {score} points!</h2>
          <div className="flex justify-center">
            <button
              className="start-btn"
              onClick={() => {
                window.location.reload();
              }}
            >
              Replay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EndModal;
