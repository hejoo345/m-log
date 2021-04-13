import {firebaseDatabase} from './firebase';
class MovieRepository{

    saveMovie(userId, movie){
        firebaseDatabase.ref(`${userId}/movies/${movie.id}`).set(movie);
    }

    removeMovie(userId, movie){
        firebaseDatabase.ref(`${userId}/movies/${movie.id}`).remove();
    }
}
export default MovieRepository;