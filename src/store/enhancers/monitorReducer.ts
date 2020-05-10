const round = (number: number) => Math.round(number * 100) / 100

// @ts-ignore
const monitorReducerEnhancer = createStore => (
  // @ts-ignore
  reducer,
  // @ts-ignore
  initialState,
  // @ts-ignore
  enhancer
) => {
  // @ts-ignore
  const monitoredReducer = (state, action) => {
    const start = performance.now();
    const newState = reducer(state, action);
    const end = performance.now();
    const diff = round(end - start);

    console.log('reducer process time:', diff);

    return newState
  };

  return createStore(monitoredReducer, initialState, enhancer)
};

export default monitorReducerEnhancer;
