const initialState = {
  lightState: true,
};

const lightReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SWITCH":
      return { ...state, lightState: !state.lightState };

    default:
      return state;
  }
};

export default lightReducer;
