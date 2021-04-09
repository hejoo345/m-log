import React, { useRef } from 'react';
import styles from './movieAdd.module.css';
import {AiOutlineSearch} from 'react-icons/ai';

const MovieAdd = (props) => {
    const searchRef = useRef();
    const searchMovie=(e)=>{
        e.preventDefault();
        console.log(searchRef.current.value);
    }
    return(
            <section className={styles.movieAddSection}>
                <div className={styles.container}>
                    <div className={styles.movieSearch}>
                        <input ref={searchRef} type="text" placeholder="감상한 영화를 검색"></input>
                        <AiOutlineSearch onClick={searchMovie} size="1.5rem"/>
                    </div>
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
                    
                    
                </div>
                    
                    
            </section>
    )};

export default MovieAdd;