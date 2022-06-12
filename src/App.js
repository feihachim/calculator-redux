import "./App.css";
import { Clear, Decimal, Digit, Display, Equals, Operator, Zero } from './components/index';
import { useSelector, useDispatch } from "react-redux";
import allActions from "./redux/actions";

function App() {
  const output = useSelector((state) => {
    return state.calculator.output;
  });

  const dispatch = useDispatch();

  function handleDecimal(e) {
    dispatch(allActions.decimalAction.decimal(e.target.textContent));
  }

  function handleClear(e) {
    dispatch(allActions.clearAction.clear());
  }

  function handleDigit(e) {
    dispatch(allActions.digitAction.digit(e.target.textContent));
  }

  function handleEquals(e) {
    dispatch(allActions.equalsAction.equals());
  }

  function handleOperator(e) {
    dispatch(allActions.operatorAction.operator(e.target.textContent));
  }

  function handleZero(e) {
    dispatch(allActions.zeroAction.zero(e.target.textContent));
  }

  return (
    <div className="App">
      <div className="calculator">
        <Display output={output} />
        <Clear dispatch={handleClear} />
        <Decimal dispatch={handleDecimal} />
        <Equals dispatch={handleEquals} />
        <Zero dispatch={handleZero} />
        <Digit id="one" value="1" dispatch={handleDigit} />
        <Digit id="two" value="2" dispatch={handleDigit} />
        <Digit id="three" value="3" dispatch={handleDigit} />
        <Digit id="four" value="4" dispatch={handleDigit} />
        <Digit id="five" value="5" dispatch={handleDigit} />
        <Digit id="six" value="6" dispatch={handleDigit} />
        <Digit id="seven" value="7" dispatch={handleDigit} />
        <Digit id="eight" value="8" dispatch={handleDigit} />
        <Digit id="nine" value="9" dispatch={handleDigit} />
        <Operator id="add" value="+" dispatch={handleOperator} />
        <Operator id="subtract" value="-" dispatch={handleOperator} />
        <Operator id="multiply" value="x" dispatch={handleOperator} />
        <Operator id="divide" value="/" dispatch={handleOperator} />
      </div>
    </div>
  );
}

export default App;
