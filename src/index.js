import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import todoApp from './reducers';
import App from './components/App';
import { saveState, loadState } from './lib/localStorage';
/* Using throtle lodash function utility to ensure that the saveState function gets call at least one time every second */
import throttle from 'lodash';

const persistedState = loadState();
const store = createStore(todoApp, persistedState);

// save the state everytime the store changes

store.subscribe(
  throttle(() => {
    saveState({ todos: store.getState().todos });
  }, 1000)
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
