import {firebaseDatabase} from './firebase';
class MovieRepository{

    syncMovies(userId, onUpdate){
        const ref = firebaseDatabase.ref(`${userId}/movies`);
        ref.on('value', snapshot=>{
            const data = snapshot.val();
            data && onUpdate(data);
        });
        return ()=> ref.off();

    }

    saveMovie(userId, movie){
        firebaseDatabase.ref(`${userId}/movies/${movie.id}`).set(movie);
    }

    removeMovie(userId, movie){
        firebaseDatabase.ref(`${userId}/movies/${movie.id}`).remove();
    }
}
export default MovieRepository;