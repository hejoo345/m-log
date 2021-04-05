import { firebaseAuth, googleProvider } from './firebase';

class AuthService{
    googleLogin(){
        const authProvider = googleProvider;
        return firebaseAuth.signInWithPopup(authProvider);
    }
    signUp(email,password){
        return firebaseAuth.createUserWithEmailAndPassword(email,password);
    }
    signIn(email, password){
        return firebaseAuth.signInWithEmailAndPassword(email,password);
    }
    logout(){
        firebaseAuth.signOut();
    }
    onAuthChange(onUserChanged){
        firebaseAuth.onAuthStateChanged(user=>{
            onUserChanged(user);
        })
    }
}

export default AuthService;