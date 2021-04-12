import React from 'react';
import MovieSearchItem from './movie_search_item';
import styles from './movie_search_list.module.css';

const MovieSearchList = ({searchList, setMovieHandler}) => {
 
    return(
        <ul className={styles.list}>
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