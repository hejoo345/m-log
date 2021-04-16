import React from 'react';
import MovieItem from './movieItem';
import styles from './movieList.module.css';

const MovieList = ({movies, selectMovie}) => {
    return(
        <ul className={styles.container}>
            {
                Object.keys(movies).map(key=>(
                    <MovieItem
                    key={key}
                    movie={movies[key]}
                    selectMovie={selectMovie}/>
                ))
            }
        </ul>
    )};

export default MovieList;