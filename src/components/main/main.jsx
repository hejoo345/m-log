import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import MovieAdd from '../movieAdd/movieAdd';
import MovieList from '../movieList/movieList';
import Navbar from '../navbar/navbar';

const {Kakao} = window;
const Main = ({authService}) => {
    const history = useHistory();
    const historyState = useLocation().state;
    const [userId, setUserId] = useState(historyState&&historyState.id);
    const [homeActive, setHomeActive] = useState(true);
    const [addActive, setAddActive] = useState(false);

    useEffect(()=>{
        authService.onAuthChange((user)=>{
            if(user){
                setUserId(user.uid);
            }else if(Kakao.Auth.getAccessToken()){
                console.log('카카오로 로그인함');
                setUserId(Kakao.Auth.getAccessToken());
            }
            else{
                history.push('/');
            }
        })
    },[authService,userId,history])

    useEffect(()=>{
        if(userId) {console.log(userId);
        }else return;
    },[])

    const onLogout =()=>{
        if(!Kakao.Auth.getAccessToken()){ // 구글 로그인
            authService.logout();
        }else{
            Kakao.Auth.logout(()=>{
                console.log(Kakao.Auth.getAccessToken());
                history.push('/');
            })
        }
    }

    const homeAndAddHandler = (item) =>{
        console.log(item);
        if(item === 'home'){
            setHomeActive(true);
            setAddActive(false);
        }else{
            setHomeActive(false);
            setAddActive(true);
        }
    }
    
    return(
        <section>
            <Navbar onLogout={onLogout} 
            homeAndAddHandler={homeAndAddHandler}/>
           {
               homeActive && (
                    <MovieList/>    
               )
           }
           {
               addActive && (
                    <MovieAdd/> 
               )
           }
        </section>
    )};

export default Main;