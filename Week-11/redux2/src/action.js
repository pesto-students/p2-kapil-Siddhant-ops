const addStepAction = (payload) => {
  return {
    type: "ADD",
    payload,
  };
};

const resetStepAction = (payload) => {
  return {
    type: "RESET",
    payload,
  };
};

export { addStepAction, resetStepAction };
