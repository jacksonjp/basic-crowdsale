//@flow

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import getWeb3 from '../util/getWeb3';

// Components
import App from './AppContainer';

// Redux
import createStore from '../shared/redux/createStore';

const history = createHistory();
const store = createStore(history);

// Initialize web3 and set in Redux.
getWeb3(store)
  .then(results => {
    console.log('Web3 initialized!');
  })
  .catch(() => {
    console.log('Error in web3 initialization.');
  });

const rootEl = document.getElementById('root');
render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  rootEl
);
