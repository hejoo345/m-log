import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const Main = ({authService}) => {
    const history = useHistory();
    const historyState = useLocation().state;
    const [userId, setUserId] = useState(historyState&&historyState.id);
    
    useEffect(()=>{
        if(userId){
            console.log(historyState.id);
        }else{
            console.log("없어요");
        }
    },[userId])

    const onLogout =()=>{
        authService.logout();
    }

    useEffect(()=>{
        authService.onAuthChange((user)=>{
            if(user){
                // console.log(usser);
                setUserId(user.uid);
            }else{
                history.push('/');
            }
        })
    },[authService,userId,history])

    return(
        <section>
            <nav>
                <button onClick={onLogout}>로그아웃</button>
            </nav>
            <h1>로그인 후 나타나는 메인화면</h1>    
        </section>
    )};

export default Main;