import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import throttle from 'lodash/throttle';
import todoApp from './reducers';
import App from './components/App';
import { loadState, saveState } from './lib/localStorage';

const persistedState = loadState();
const store = createStore(todoApp, persistedState);

/*
Use throtle lodash function utility to ensure that the saveState function gets call time every second
*/

store.subscribe(
  throttle(() => {
    saveState({
      todos: store.getState().todos,
    });
  }, 1000)
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
