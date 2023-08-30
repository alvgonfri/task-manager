// eslint-disable-next-line react/prop-types
function UnderlinedButton({ text, isActive, onClick }) {
  const buttonClasses = isActive
    ? "text-slate-700 font-bold w-24 sm:w-32 py-2 px-4 mb-3 border-b-2 border-slate-700 transition duration-500"
    : "text-slate-300 hover:text-slate-700 font-semibold hover:font-bold w-24 sm:w-32 py-2 px-4 mb-3 border-b-2 border-slate-300 hover:border-slate-700 transition duration-500";

  return (
    <button className={buttonClasses} onClick={onClick}>
      {text === "pending" ? "Pending" : ""}
      {text === "in-progress" ? "In Progress" : ""}
      {text === "completed" ? "Completed" : ""}
    </button>
  );
}

export default UnderlinedButton;
