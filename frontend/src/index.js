import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/app.js';
import "./styles/global.css";
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
//import store from './redux/store'
import store from './redux-toolkit/store'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);