const initialState = {
  steps: 0,
};

const stepsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD":
      return { ...state, steps: state.steps + 1 };

    case "RESET":
      return { ...state, steps: 0 };

    default:
      return state;
  }
};

export default stepsReducer;
