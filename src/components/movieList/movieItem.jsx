import React from 'react';
import styles from './movieItem.module.css';

const MovieItem = ({movie}) => {
    return(
            <li className={styles.container}>
                <div className={styles.movie}>
                    <div className={styles.info}>
                        <p>{movie.title}</p>
                        <p>{movie.date}</p>
                    </div>
                    <div className={styles.imgBox}>
                        <img className={styles.img} src={movie.imgURL}></img>
                    </div>
                </div>
            </li>
    )};

export default MovieItem;