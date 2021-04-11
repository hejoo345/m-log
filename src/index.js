import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import AuthService from './service/auth_service';
import NaverSearch from './service/naver_search';

const authService = new AuthService();
const naverSearch = new NaverSearch();


ReactDOM.render(
  <React.StrictMode>
    <App
    authService={authService}
    naverSearch={naverSearch}/>
  </React.StrictMode>,
  document.getElementById('root')
);

