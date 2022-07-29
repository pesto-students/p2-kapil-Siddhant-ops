const switchLightAction = (payload) => {
  return {
    type: "SWITCH",
    payload,
  };
};

export { switchLightAction };
