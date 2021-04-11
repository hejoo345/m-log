import React from 'react';
import MovieSearchItem from './movie_search_item';

const MovieSearchList = ({searchList}) => {
    return(
        <ul>
        {
            Object.keys(searchList).map((key)=>{
                <MovieSearchItem
                key={key}
                movie={searchList[key]}/>
            })
        }
    </ul>
    )};

export default MovieSearchList;