
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import _ from 'underscore';

import reducer from './reducers';

import './index.html';
import './images/favicon.ico';
import './style/style.css';

import App from './components/App';
import { resize } from './actions';

const canvasWidth  = document.documentElement.clientWidth;
const canvasHeight = document.documentElement.clientHeight;

const store = createStore(reducer);
store.dispatch(resize(canvasWidth, canvasHeight));

window.addEventListener(
  'resize',
  _.debounce(
    () => {
      const canvasWidth  = document.documentElement.clientWidth;
      const canvasHeight = document.documentElement.clientHeight;
      store.dispatch(resize(canvasWidth, canvasHeight));
    },
    200
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);

