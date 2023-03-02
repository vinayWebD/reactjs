import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';
import App from './App';

import reportWebVitals from './reportWebVitals';
import store from './store/store.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter basename="reactjs">
      <App />
    </BrowserRouter>
  </Provider>,

  // </React.StrictMode>,
);

reportWebVitals();
