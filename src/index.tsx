import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './assets/styles/main.scss';
import Login from './pages/login/Login';

ReactDOM.render(
  <BrowserRouter>
    <Login />
  </BrowserRouter>,
  document.getElementById('root')
);
