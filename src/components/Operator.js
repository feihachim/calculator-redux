import "../styles/Operator.css";

function Operator({ id, value, dispatch }) {
  return (
    <button id={id} className="operator" onClick={dispatch}>
      {value}
    </button>
  );
}

export default Operator;
