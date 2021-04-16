import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import AuthService from './service/auth_service';
import NaverSearch from './service/naver_search';
import 'react-datepicker/dist/react-datepicker.css';
import MovieRepository from './service/movie_repository';
import ImgUpload from './service/img_upload';

const authService = new AuthService();
const naverSearch = new NaverSearch();
const movieRepository = new MovieRepository();
const imgUpload = new ImgUpload();


ReactDOM.render(
  <React.StrictMode>
    <App
    authService={authService}
    naverSearch={naverSearch}
    movieRepository={movieRepository}
    imgUpload={imgUpload}/>
  </React.StrictMode>,
  document.getElementById('root')
);

