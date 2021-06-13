import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'style/main.scss';
import Menu from 'pages/menu/Menu';

ReactDOM.render(
  <BrowserRouter>
    <Menu />
  </BrowserRouter>,
  document.getElementById('root')
);
