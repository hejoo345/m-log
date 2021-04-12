import React, { useEffect, useRef, useState } from 'react';
import styles from './movieAdd.module.css';
import {AiOutlineSearch} from 'react-icons/ai';
import MovieSearchList from '../movie_search_list/movie_search_list';

const MovieAdd = ({naverSearch}) => {
    const searchRef = useRef();
    const [searchList, setSearchList] = useState({});
    const [listActive, setListActive] = useState(false);
    const [movie, setMovie] = useState({});

    const searchMovie=(e)=>{
        e.preventDefault();
        if(searchRef.current.value==='') return;

        naverSearch.movieSearch(searchRef.current.value)
        .then((movies)=>{
            setSearchList(Object.assign({},movies) );
            setListActive(true);
            // console.log(movies);
        })
        .catch(console.log)

        
    }

    const setMovieHandler=(movie)=>{
        console.log(movie);
        setMovie(movie);
        setListActive(false);
        searchRef.current.value='';
    }
    return(
            <section className={styles.movieAddSection}>
                <div className={styles.container}>
                    <form className={styles.movieSearch} onSubmit={searchMovie}>
                        <input ref={searchRef} type="text" placeholder="감상한 영화를 검색"></input>
                        <AiOutlineSearch onClick={searchMovie} size="1.5rem"/>
                        
                    </form>
                    {
                        listActive &&(
                            <div className={styles.list}>
                                <MovieSearchList
                                searchList={searchList}
                                setMovieHandler={setMovieHandler}/>
                            </div>
                        )
                    }
                    <div className={styles.movie}>
                        <div className={styles.img}>
                            <img alt="포스터" src={movie.image} width="100%" height="100%"></img>
                        </div>
                        <div className={styles.info}>
                            <div>
                                <div><span>제목</span></div>
                                <input placeholder="제목(영어제목, 개봉일)" 
                                value={movie.title && movie.title.replace(/<b>/gi,"").replace(/<\/b>/gi,"")}></input>
                            </div>
                            <div>
                                <div><span>감독</span></div>
                                <input value={movie.director}></input>
                            </div>
                            <div>
                                <div><span>배우</span></div>
                                <input value={movie.actor}></input>
                            </div>
                            <div>
                                <div><span>감상일</span></div>
                                <input></input>
                            </div>
                            <div>
                                <div className={styles.comment}><span>코멘트</span></div>
                                <textarea></textarea>
                            </div>
                        </div>
                    </div>

                </div>
                    
                    
            </section>
    )};

export default MovieAdd;