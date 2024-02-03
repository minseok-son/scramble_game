import Boxes from "@components/Boxes";

const Main = ({ scrambled, guess, wordLen, status }) => {
  return (
    <>
      {scrambled === "" ? (
        <div className="text-center font-bold text-4xl">Loading...</div>
      ) : (
        <>
          <div className="flex items-center justify-center text-4xl font-bold my-3">
            Unscramble: {scrambled}
          </div>
          <Boxes guess={guess} wordLen={wordLen} status={status} />
        </>
      )}
    </>
  );
};

export default Main;
