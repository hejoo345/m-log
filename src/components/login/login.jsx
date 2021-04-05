import React, { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './login.module.css';
const Login = ({authService}) => {
    const history = useHistory();

    const idRef = useRef();
    const pwRef = useRef();

    const gotoMain = (userId) =>{
        history.push({
            pathname: '/main',
            state: {id:userId},
        })
    }
    const googleOnLogin = () =>{
        authService.googleLogin()
        .then((data)=>{
            gotoMain(data.user.uid);
        })
    }
    const onSignIn = (e) =>{
        e.preventDefault();
        if(!idRef.current.value){
            idRef.current.focus();
        }
        else if(!pwRef.current.value){
            pwRef.current.focus();
        }
        else{
            try{
                authService.signIn(idRef.current.value, pwRef.current.value)
                .then((data)=>{
                    gotoMain(data.user.uid);
                })
            }catch(error){
                console.log(error);
            }
        }
    }
    return(
        <section className={styles.loginSection}>
            <nav>
                <button className={styles.gotoSignup}><Link to='./signup'>회원가입</Link></button>
            </nav>
            <div className={styles.container}>
                <h2>로그인</h2>
                <form className={styles.login}>
                    <input ref={idRef} type="text" placeholder="이메일(example@gmail.com)"></input>
                    <input ref={pwRef} type="password" placeholder="비밀번호"></input>
                    <button onClick={onSignIn}>로그인</button>
                </form>
                <div>
                    <button onClick={googleOnLogin}>Google</button>
                    <button>카카오</button>
                </div>
                
            </div>
        </section>
    )};

export default Login;