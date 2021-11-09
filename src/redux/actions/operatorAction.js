const operator = (value) => {
  return {
    type: "OPERATOR",
    payload: value,
  };
};

const operatorAction = { operator };

export default operatorAction;
