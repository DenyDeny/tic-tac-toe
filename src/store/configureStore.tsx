import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import monitorReducersEnhancer from './enhancers/monitorReducer';
import loggerMiddleware from './middlewares/logger';
import rootReducer from '../reducers';


// @ts-ignore
export default function configureStore() {
  const middlewares = [loggerMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer, monitorReducersEnhancer];
  // @ts-ignore
  const composedEnhancers = composeWithDevTools(...enhancers);

  // @ts-ignore
  const store = createStore(rootReducer, composedEnhancers);

  return store;
};
