import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import AuthService from './service/auth_service';
import NaverSearch from './service/naver_search';
import 'react-datepicker/dist/react-datepicker.css';
import MovieRepository from './service/movie_repository';

const authService = new AuthService();
const naverSearch = new NaverSearch();
const movieRepository = new MovieRepository();


ReactDOM.render(
  <React.StrictMode>
    <App
    authService={authService}
    naverSearch={naverSearch}
    movieRepository={movieRepository}/>
  </React.StrictMode>,
  document.getElementById('root')
);

