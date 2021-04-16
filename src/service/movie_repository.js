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

    searchMovie(userId, search, onUpdate){
        const ref = firebaseDatabase.ref(`${userId}/movies`);
        ref.orderByChild('title').equalTo(`${search}`).on('value',snapshot=>{
            const data = snapshot.val();
            data && onUpdate(data);
            console.log(snapshot.val());
        })
    }

    saveMovie(userId, movie){
        firebaseDatabase.ref(`${userId}/movies/${movie.id}`).set(movie);
    }

    removeMovie(userId, movie){
        firebaseDatabase.ref(`${userId}/movies/${movie.id}`).remove();
    }
}
export default MovieRepository;