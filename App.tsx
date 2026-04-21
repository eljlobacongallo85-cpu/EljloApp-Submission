import React from 'react';
import './global.css';
import AppEntry from './src/app';

import rootSaga from './src/app/sagas';
import configureStore from './src/app/reducers';

import { Provider } from 'react-redux';

const { store, runSaga } = configureStore();
runSaga(rootSaga);

const App = () => (
  <Provider store={store}>
    <AppEntry />
  </Provider>
);

export default App;
