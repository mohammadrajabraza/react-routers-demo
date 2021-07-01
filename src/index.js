import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import ScrollToTop from './utlities/ScrollToTop'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename="router">
      <ScrollToTop/>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
