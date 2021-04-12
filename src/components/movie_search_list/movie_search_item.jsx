import React from 'react';
import styles from './movie_search_item.module.css';

const MovieSearchItem = ({movie, setMovieHandler}) => {
    
    return(
            <li className={styles.item} onClick={()=>setMovieHandler(movie)}>
                
                <div className={styles.img}>
                    <img className={styles.image} src={movie.image}></img>
                </div>
                <div className={styles.info}>
                    <p className={styles.title}>{movie.title.replace(/<b>/gi,"").replace(/<\/b>/gi,"")}</p>
                    <p>{movie.subtitle.replace(/<b>/gi,"").replace(/<\/b>/gi,"")}</p>
                    <p>{movie.pubDate}</p>
                    <p>{movie.director}</p>
                </div>
                </li>
    )};

export default MovieSearchItem;