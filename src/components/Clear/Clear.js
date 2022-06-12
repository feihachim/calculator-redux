import "./Clear.css";

function Clear({ dispatch }) {
  return (
    <button id="clear" onClick={dispatch}>
      AC
    </button>
  );
}

export default Clear;
