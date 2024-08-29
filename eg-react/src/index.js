import React from 'react';
import ReactDOM from 'react-dom'; // Import ReactDOM like this
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

import cartReducer from './components/reducers/cartReducer';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';

const store = createStore(cartReducer);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
