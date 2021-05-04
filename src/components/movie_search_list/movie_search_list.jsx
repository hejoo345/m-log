import React, { useEffect, useRef } from 'react';
import MovieSearchItem from './movie_search_item';
import styles from './movie_search_list.module.css';

const MovieSearchList = ({searchList, setMovieHandler, moreMovie}) => {

    const scrollRef = useRef();

    const handleScroll = e =>{
        const { scrollHeight, scrollTop, clientHeight} = e.target;
        if(scrollTop+clientHeight >= scrollHeight){
            moreMovie();
        }
    }

    return(
        <ul ref={scrollRef} className={styles.list} onScroll={handleScroll}>
        {
            Object.keys(searchList).map(key=>(
                <MovieSearchItem
                key={key}
                movie={searchList[key]}
                setMovieHandler={setMovieHandler}/>
            ))
        }
        </ul>
    )};

export default MovieSearchList;