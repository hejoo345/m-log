import React from 'react';
import styles from './movieItem.module.css';

const MovieItem = ({movie, selectMovie}) => {
    return(
            <li className={styles.container} onClick={()=>selectMovie(movie)}>
                <div className={styles.movie}>
                    <div className={styles.info}>
                        <p className={styles.title}>{movie.title}</p>
                        <p className={styles.date}>{movie.date}</p>
                        <p className={styles.comment}>{movie.comment}</p>
                    </div>
                    <div className={styles.imgBox}>
                        <img className={styles.img} src={movie.imgURL}></img>
                    </div>
                </div>
            </li>
    )};

export default MovieItem;