const getReducerState = (key) => {
  return (state) => state[key];
};

export { getReducerState };
