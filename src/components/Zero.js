import "../styles/Zero.css";

function Zero({ dispatch }) {
  return (
    <button id="zero" onClick={dispatch}>
      0
    </button>
  );
}

export default Zero;
