import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import MovieAdd from '../movieAdd/movieAdd';
import MovieList from '../movieList/movieList';
import Navbar from '../navbar/navbar';
import ViewLog from '../view_log/view_log';
import styles from './main.module.css';

const {Kakao} = window;
const Main = ({authService, naverSearch, movieRepository, imgUpload}) => {
    const history = useHistory();
    const historyState = useLocation().state;
    const [userId, setUserId] = useState(historyState&&historyState.id);
    const [homeActive, setHomeActive] = useState(true);
    const [addActive, setAddActive] = useState(false);
    const [movies, setMovies] = useState({});
    const [movieLength, setMovieLength] = useState();
    const [selectedMovie, setSelectedMovie] = useState();
    const [showModal, setShowModal] = useState(false);

    useEffect(()=>{
        authService.onAuthChange((user)=>{
            if(user){
                setUserId(user.uid);
            }else if(Kakao.Auth.getAccessToken()){
                console.log('카카오로 로그인함');
                setUserId(Kakao.Auth.getAccessToken());
            }
            else{
                history.push('/');
            }
        })
    },[authService,userId,history])


    useEffect(()=>{
        if(!userId) return;

         movieRepository.syncMovies(userId,(movies)=>{
            setMovies(movies);
            setMovieLength(Object.keys(movies).length);
        });
        // return ()=>stopSync();
        
    },[userId, movieRepository]);

    const onMovieAdd = (movie)=>{ // 영화 추가 및 업데이트
        setMovies((preMovies)=>{
            const newMovies = {...preMovies};
            newMovies[movie.id] = movie;
            return newMovies;
        });
        movieRepository.saveMovie(userId, movie);
        homeAndAddHandler('home');
    }

    const onMovieDelete = (item) =>{ // 영화 삭제
        movieRepository.removeMovie(userId, item);
        setShowModal(!showModal);
        setSelectedMovie();
    }

    const onLogout =()=>{
        if(!Kakao.Auth.getAccessToken()){ // 구글 로그인
            authService.logout();
        }else{
            Kakao.Auth.logout(()=>{
                console.log(Kakao.Auth.getAccessToken());
                history.push('/');
            })
        }
    }

    const homeAndAddHandler = (item) =>{
        // console.log(item);
        if(item === 'home'){
            setHomeActive(true);
            setAddActive(false);
        }else{
            setHomeActive(false);
            setAddActive(true);
        }
    }

    const searchHandler = (item)=>{ //  기록한 영화들 중 검색
        movieRepository.searchMovie(userId,item, (movies)=>{
            setMovies(movies);
        });
    }

    const selectMovieHandler = (selected) =>{ // 영화 목록 중 하나 선택 했을 때
        console.log(selected);
        setSelectedMovie(selected);
        setShowModal(!showModal);
    }

    const modalHandler = () =>{ // 모달 바깥 부분 클랙했을 때 사라지게 하는 함수
        setShowModal(!showModal);
        setSelectedMovie();
    }

    const editHandler = () =>{ // 편집 눌렀을 때
        setShowModal(!showModal);
        homeAndAddHandler('add');
    }

   

    
    return(
        <section className={styles.mainSection}>
            <Navbar onLogout={onLogout} 
            homeAndAddHandler={homeAndAddHandler}
            homeActive={homeActive}
            addActive={addActive}
            onSearchHandler={searchHandler}
            movieLength={movieLength}/>
           {
               homeActive && (
                    <MovieList
                    movies={movies}
                    movieRepository={movieRepository}
                    selectMovie={selectMovieHandler}/>    
               )
           }
           {
               addActive && (
                    <MovieAdd
                    naverSearch={naverSearch}
                    onMovieAdd={onMovieAdd}
                    imgUpload={imgUpload}
                    selectedMovie={selectedMovie}/> 
               )
           }
           {
               showModal && (
                   <div className={styles.dimmer} onClick={modalHandler}>
                        <div className={styles.modal} onClick={(e)=>e.stopPropagation()}>
                        <ViewLog selectedMovie={selectedMovie}
                        editHandler={editHandler}
                        movieDelete={onMovieDelete}/>
                        </div>
                    </div>
               )
           }
        </section>
    )};

export default Main;