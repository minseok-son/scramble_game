const Box = ({ value, status }) => {
  const colorMapping = {
    default: "border-slate-400",
    correct: "border-green-500",
    incorrect: "border-red-500",
  };

  const borderColorClass = colorMapping[status];

  const classes = `w-20 h-20 border-solid border-2 flex items-center justify-center mx-0.5 text-4xl font-bold rounded ${borderColorClass} `;
  return (
    <>
      <div className={classes}>{value}</div>
    </>
  );
};

export default Box;
