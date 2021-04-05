import React, { useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './sign_up.module.css';

const Signup = ({authService}) => {

    const history = useHistory();
    
    const formRef = useRef();
    const emailRef = useRef();
    const pwRef = useRef();
    const pwCkRef = useRef();

    const onSignUp=(e)=>{
        e.preventDefault();
        if(!emailRef.current.value){
            emailRef.current.focus();
        }
        else if(!pwRef.current.value){
            pwRef.current.focus();
        }
        else if(!pwCkRef.current.value){
            pwCkRef.current.focus();
        }
        else if(pwRef.current.value!==pwCkRef.current.value){
            pwCkRef.current.focus();
            console.log("비번 달라용");
        }else{
            try{
                authService.signUp(emailRef.current.value,pwRef.current.value)
                .then(()=>{
                    history.push('/');
                });
            }catch(error){
                console.log(error);
                // console.log("이메일이나 비밀번호의 형식이 올바르지 않습니다.");
            }
        }
        
    }

    return(
        <section className={styles.signupSection}>
            <nav>
                <button className={styles.gotoLogin}><Link to='./'>로그인</Link></button>
            </nav>
            <div className={styles.container}>
                <h2>회원가입</h2>
                <form ref={formRef} className={styles.signup}>
                    <input ref={emailRef} type="text" placeholder="이메일(example@gmail.com)"></input>
                    <input ref={pwRef} type="password" placeholder="비밀번호"></input>
                    <input ref={pwCkRef} type="password" placeholder="비밀번호 확인"></input>
                    <button onClick={onSignUp}>회원가입</button>
                </form>
                
            </div>
        </section>
    )};

export default Signup;