const digit = (value) => {
  return {
    type: "DIGIT",
    payload: value,
  };
};

const digitAction = { digit };

export default digitAction;
