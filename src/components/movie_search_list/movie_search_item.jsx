import React from 'react';

const MovieSearchItem = ({movie}) => {
    console.log(movie);
    return(
            <li>{movie.title}</li>
    )};

export default MovieSearchItem;