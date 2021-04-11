import React, { useEffect, useRef, useState } from 'react';
import styles from './movieAdd.module.css';
import {AiOutlineSearch} from 'react-icons/ai';
import MovieSearchList from '../movie_search_list/movie_search_list';

const MovieAdd = ({naverSearch}) => {
    const searchRef = useRef();
    const [searchList, setSearchList] = useState([]);
    const searchMovie=(e)=>{
        e.preventDefault();
        if(searchRef.current.value==='') return;

        naverSearch.movieSearch(searchRef.current.value)
        .then((movies)=>{
            setSearchList(Object.assign({},movies) );
            console.log(movies);
        })
        .catch(console.log)
    }
    return(
            <section className={styles.movieAddSection}>
                <div className={styles.container}>
                    <form className={styles.movieSearch} onSubmit={searchMovie}>
                        <input ref={searchRef} type="text" placeholder="감상한 영화를 검색"></input>
                        <AiOutlineSearch onClick={searchMovie} size="1.5rem"/>
                    </form>
                    
                    <div className={styles.movie}>
                        <div className={styles.img}>영화 포스터</div>
                        <div className={styles.info}>
                            <div>
                                <div><span>제목</span></div>
                                <input placeholder="제목(영어제목, 개봉일)"></input>
                            </div>
                            <div>
                                <div><span>감독</span></div>
                                <input></input>
                            </div>
                            <div>
                                <div><span>출연배우</span></div>
                                <input></input>
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
                    <MovieSearchList searchList={searchList}/>
                   
                </div>
                    
                    
            </section>
    )};

export default MovieAdd;