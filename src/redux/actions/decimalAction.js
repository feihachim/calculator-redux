const decimal = (value) => {
  return {
    type: "DECIMAL",
    payload: value,
  };
};

const decimalAction = { decimal };

export default decimalAction;
