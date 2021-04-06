import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './login.module.css';
import {RiKakaoTalkFill} from 'react-icons/ri';
import {FcGoogle} from 'react-icons/fc';

const {Kakao} = window;

const Login = ({authService}) => {
    const history = useHistory();
    
    const [notice,setNotice]=useState('⠀');

    const idRef = useRef();
    const pwRef = useRef();

    useEffect(()=>{
        console.log(Kakao.isInitialized());
    },[])

    const gotoMain = (userId) =>{
        history.push({
            pathname: '/main',
            state: {
                id:userId,
            },
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
            setNotice("이메일을 입력하세요.");
        }
        else if(!pwRef.current.value){
            pwRef.current.focus();
            setNotice("비밀번호를 입력하세요.");
        }
        else{
            authService.signIn(idRef.current.value, pwRef.current.value)
            .then((data)=>{
                gotoMain(data.user.uid);
            })
            .catch((err)=>{
                setNotice("이메일이나 비밀번호의 형식이 올바르지 않습니다.");
                console.log(err);
            });
        }
    }
    const kakaoLogin = ()=>{
        Kakao.Auth.login({
            success: (data)=>{
                gotoMain(data.access_token);
            },
            fail: (err)=>{
                console.log(err);
            }
        })
    }

    return(
        <section className={styles.loginSection}>
            <nav>
                
                <button className={styles.gotoSignup}><Link to='./signup' className={styles.gotoSignupLink}>회원가입</Link></button>
                
            </nav>
            <div className={styles.container}>
                <h2>로그인</h2>
                <form className={styles.login}>
                    <div className={styles.input}>
                        <div >
                            <input className={styles.email} ref={idRef} type="text" placeholder="이메일(example@gmail.com)"></input>
                        </div>
                        <div >
                            <input className={styles.pw} ref={pwRef} type="password" placeholder="비밀번호"></input>
                        </div>
                    </div>
                    <div className={styles.noticeDiv}><span className={styles.notice}>{notice}</span></div>
                    <button className={styles.loginBtn} onClick={onSignIn}>로그인</button>
                </form>
                <ul className={styles.socialBtn}>
                    <li><button className={styles.googleBtn} onClick={googleOnLogin}><FcGoogle size="2rem"/></button></li>
                    <li><button className={styles.kakaoBtn} onClick={kakaoLogin}><RiKakaoTalkFill size="2rem" color="#131200"/></button></li>
                
                </ul>

                
            </div>
        </section>
    )};

export default Login;