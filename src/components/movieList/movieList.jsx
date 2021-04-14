import React from 'react';
import MovieItem from './movieItem';
import styles from './movieList.module.css';

const MovieList = ({movies}) => {
    return(
        <ul className={styles.container}>
            {
                Object.keys(movies).map(key=>(
                    <MovieItem
                    key={key}
                    movie={movies[key]}/>
                ))
            }
        </ul>
    )};

export default MovieList;