const moduleCalculator = (() => {
  const SPLITTER = /(\d+(\.\d+)?)|([+x/-]+)/g;
  const ERROR_MESSAGE = "YOU FOOL!!";
  const INFINITE = "INFINITE";
  const OPERATOR = /[+-/x]/;
  const DOT = /[.]/;
  const NUMBER = /\d/;

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

  function filterExpression(expression) {
    let arrayCopy = expression.match(SPLITTER);
    for (let i = 0; i < arrayCopy.length; i++) {
      if (OPERATOR.test(arrayCopy[i]) && arrayCopy[i].length > 1 && !NUMBER.test(arrayCopy[i])) {
        if (arrayCopy[i].charAt(arrayCopy[i].length - 1) !== "-") {
          arrayCopy[i] = arrayCopy[i].charAt(arrayCopy[i].length - 1);
        }
        else {
          arrayCopy[i] = arrayCopy[i].substring(0, arrayCopy[i].length - 1);
          arrayCopy[i + 1] = "-" + arrayCopy[i + 1];
        }
      }
    }
    return arrayCopy.filter(element => element !== "");
  }

  function operate(firstOperand, operator, secondOperand = "") {
    let result;
    let newSecondOperand = secondOperand ? secondOperand : firstOperand;
    switch (operator) {
      case "+":
        result = parseFloat(firstOperand) + parseFloat(newSecondOperand);
        break;
      case "-":
        result = parseFloat(firstOperand) - parseFloat(newSecondOperand);
        break;
      case "x":
        result = parseFloat(firstOperand) * parseFloat(newSecondOperand);
        break;
      case "/":
        result = parseFloat(firstOperand) / parseFloat(newSecondOperand);
        break;
      default:
        result = parseFloat(firstOperand);
        break;
    }
    return validateNumber(result);
  }

  function calculate(expression) {
    let result;
    let buffer;
    let filteredEpression = filterExpression(expression);
    if (filteredEpression.length === 1) {
      result = filteredEpression[0];
    }
    if (filteredEpression.length === 2) {
      result = operate(filteredEpression[0], filteredEpression[1]);
    }
    else {
      while (filteredEpression.length > 2) {
        buffer = operate(filteredEpression[0], filteredEpression[1], filteredEpression[2]);
        filteredEpression.splice(0, 3, buffer);
      }
      if (filteredEpression.length === 1) {
        result = filteredEpression[0];
      }
      if (filteredEpression.length === 2) {
        result = operate(filteredEpression[0], filteredEpression[1]);
      }
    }
    return result;
  }

  function testLastCharacter(str, target) {
    let lastCharacter = str.charAt(str.length - 1);
    return target.test(lastCharacter);
  }

  function clearDisplay(state) {
    return {
      ...state,
      output: "0",
      fullOperation: "",
    };
  }

  function printDigit(state, action) {
    let newOutput = state.output;
    let newFullOperation = state.fullOperation;
    if ((testLastCharacter(newFullOperation, OPERATOR) || newOutput === "0") && !testLastCharacter(newFullOperation, DOT)) {
      newOutput = action.payload;
    }
    else {
      newOutput += action.payload;
    }
    newFullOperation += action.payload;
    return {
      ...state,
      output: newOutput,
      fullOperation: newFullOperation,
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

    let newFullOperation = state.fullOperation;
    newFullOperation = calculate(newFullOperation);
    return {
      ...state,
      output: newFullOperation,
      fullOperation: newFullOperation,
    };
  }

  function printOperator(state, action) {

    let newFullOperation = state.fullOperation;
    if (!testLastCharacter(newFullOperation, DOT)) {
      newFullOperation += action.payload
    }
    return {
      ...state,
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
