const zero = (value) => {
  return {
    type: "ZERO",
    payload: value,
  };
};

const zeroAction = { zero };

export default zeroAction;
