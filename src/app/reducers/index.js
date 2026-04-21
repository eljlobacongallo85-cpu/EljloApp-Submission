import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import auth from './auth';

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  auth,
});

export default () => {
  const composeEnhancers =
    global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));
  const store = createStore(rootReducer, enhancer);
  const runSaga = sagaMiddleware.run;

  return { store, runSaga };
};
