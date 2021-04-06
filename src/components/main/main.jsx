import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const {Kakao} = window;
const Main = ({authService}) => {
    const history = useHistory();
    const historyState = useLocation().state;
    const [userId, setUserId] = useState(historyState&&historyState.id);


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
    
    return(
        <section>
            <nav>
                <button onClick={onLogout}>로그아웃</button>
            </nav>
            <h1>로그인 후 나타나는 메인화면</h1>    
        </section>
    )};

export default Main;