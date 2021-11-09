const moduleCalculator = (() => {
  const ERROR_MESSAGE = "YOU FOOL!!";
  const OPERATOR = /[+-/x]/;
  const DOT = /[.]/;
  const INFINITE = "INFINITE";

  function add(number1, number2) {
    return parseFloat(number1) + parseFloat(number2);
  }

  function sub(number1, number2) {
    return parseFloat(number1) - parseFloat(number2);
  }

  function multiply(number1, number2) {
    return parseFloat(number1) * parseFloat(number2);
  }

  function divide(number1, number2) {
    return parseFloat(number1) / parseFloat(number2);
  }

  function validateNumber(number) {
    let result;
    let lgString;
    let strNumber;
    if (number === Infinity) {
      result = ERROR_MESSAGE;
    } else if (number > 9999999999) {
      result = INFINITE;
    } else {
      if (number === Math.floor(number)) {
        result = number.toString();
      } else {
        strNumber = number.toString();
        lgString = strNumber.length;
        if (lgString <= 10) {
          result = strNumber;
        } else {
          result = strNumber.slice(0, 10);
        }
      }
    }
    return result;
  }

  function operate(firstOperand, secondOperand, operator) {
    let result;
    switch (operator) {
      case "+":
        result = add(firstOperand, secondOperand);
        break;
      case "-":
        result = sub(firstOperand, secondOperand);
        break;
      case "x":
        result = multiply(firstOperand, secondOperand);
        break;
      case "/":
        result = divide(firstOperand, secondOperand);
        break;
      default:
        result = 0;
        break;
    }
    return validateNumber(result);
  }

  function testLastCharacter(str, target) {
    let lastCharacter = str.charAt(str.length - 1);
    return target.test(lastCharacter);
  }

  function clearState(state, action) {
    return {
      ...state,
      output: action.payload,
      firstOperand: "",
      secondOperand: "",
      operator: "",
      fullOperation: action.payload,
    };
  }

  function clearDisplay(state) {
    return {
      ...state,
      output: "0",
      firstOperand: "",
      secondOperand: "",
      operator: "",
      fullOperation: "",
    };
  }

  function printDigit(state, action) {
    let newOutput = state.output;
    if (
      (!testLastCharacter(state.fullOperation, OPERATOR) ||
        testLastCharacter(state.fullOperation, DOT)) &&
      state.output !== "0"
    ) {
      newOutput = state.output + action.payload;
    } else {
      newOutput = action.payload;
    }
    return {
      ...state,
      output: newOutput,
      fullOperation: state.fullOperation + action.payload,
    };
  }

  function printZero(state, action) {
    if (state.output !== "0") {
      return {
        ...state,
        output: state.output + action.payload,
        fullOperation: state.fullOperation + action.payload,
      };
    }
    return state;
  }

  function printTotal(state) {
    let newOutput = state.output;
    let newFirstOperand = state.firstOperand;
    let newSecondOperand = state.secondOperand;
    let newOperator = state.operator;
    let newFullOperation = state.fullOperation;
    if (state.firstOperand && state.operator) {
      newSecondOperand = newOutput;
      newOutput = operate(newFirstOperand, newSecondOperand, newOperator);
      newFullOperation = newOutput;
    }
    return {
      ...state,
      output: newOutput,
      firstOperand: newFirstOperand,
      secondOperand: newSecondOperand,
      operator: newOperator,
      fullOperation: newFullOperation,
    };
  }

  function printOperator(state, action) {
    let newOutput = state.output;
    let newFirstOperand = state.firstOperand;
    let newSecondOperand = state.secondOperand;
    let newOperator = state.operator;
    let newFullOperation = state.fullOperation;
    if (!state.firstOperand) {
      newFirstOperand = state.output;
    } else {
      if (testLastCharacter(state.fullOperation, OPERATOR)) {
        newFullOperation = state.fullOperation.slice(0, -1);
      } else {
        newSecondOperand = state.output;
        newFirstOperand = operate(
          newFirstOperand,
          newSecondOperand,
          newOperator
        );
        newSecondOperand = "";
        newOutput = newFirstOperand;
      }
    }
    newOperator = action.payload;
    newFullOperation += action.payload;
    return {
      ...state,
      output: newOutput,
      firstOperand: newFirstOperand,
      secondOperand: newSecondOperand,
      operator: newOperator,
      fullOperation: newFullOperation,
    };
  }

  function printDecimal(state, action) {
    if (!state.output.includes(action.payload)) {
      return {
        ...state,
        output: state.output + action.payload,
        fullOperation: state.fullOperation + action.payload,
      };
    }
    return state;
  }

  return {
    clearDisplay,
    printDecimal,
    printDigit,
    printOperator,
    printTotal,
    printZero,
  };
})();

export default moduleCalculator;
