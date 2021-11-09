import "../styles/Digit.css";

function Digit({ id, value, dispatch }) {
  return (
    <button id={id} className="digit" onClick={dispatch}>
      {value}
    </button>
  );
}

export default Digit;
