import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './components/Index';
import './fonts/Muli-VariableFont_wght.ttf';

// Redux
import Store from './components/redux/store/configureStore';
import { Provider } from 'react-redux';

const store = Store();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
