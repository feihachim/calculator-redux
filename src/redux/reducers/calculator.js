import moduleCalculator from "../../logic/calculator";

const initialState = {
  output: "0",
  fullOperation: "",
};

const calculator = (state = initialState, action) => {
  switch (action.type) {
    case "DECIMAL":
      return moduleCalculator.printDecimal(state, action);
    case "CLEAR":
      return moduleCalculator.clearDisplay(state);
    case "DIGIT":
      return moduleCalculator.printDigit(state, action);
    case "EQUALS":
      return moduleCalculator.printTotal(state);
    case "OPERATOR":
      return moduleCalculator.printOperator(state, action);
    case "ZERO":
      return moduleCalculator.printZero(state, action);
    default:
      return state;
  }
};

export default calculator;
