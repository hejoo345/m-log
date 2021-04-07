import React, { useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './sign_up.module.css';

const Signup = ({authService}) => {

    const history = useHistory();

    const [notice,setNotice]=useState('⠀');

    const formRef = useRef();
    const emailRef = useRef();
    const pwRef = useRef();
    const pwCkRef = useRef();

    const onSignUp=(e)=>{
        e.preventDefault();
        if(!emailRef.current.value){
            emailRef.current.focus();
            setNotice("이메일을 입력하세요.");
        }
        else if(!pwRef.current.value){
            pwRef.current.focus();
            setNotice("비밀번호를 입력하세요.");
        }
        else if(!pwCkRef.current.value){
            pwCkRef.current.focus();
            setNotice("비밀번호를 한 번 더 입력하세요.");
        }
        else if(pwRef.current.value!==pwCkRef.current.value){
            pwCkRef.current.focus();
            setNotice("비밀번호가 다릅니다.");
        }else{
            try{
                authService.signUp(emailRef.current.value,pwRef.current.value)
                .then(()=>{
                    alert('회원가입 성공');
                    history.push('/');
                })
                .catch((e)=>{
                    console.log(e);
                    if(e.code === 'auth/email-already-in-use'){
                        setNotice("이미 사용중인 이메일입니다.");
                    }
                    else if(e.code === 'auth/invalid-email'){
                        setNotice("이메일 형식이 올바르지 않습니다.");
                    }
                    else if(e.code === 'auth/weak-password'){
                        setNotice("비밀번호를 6자리 이상 입력해주세요.");
                    }

                    
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
                <button className={styles.gotoLogin}><Link to='./' className={styles.gotoLoginLink}>로그인</Link></button>
            </nav>
            <div className={styles.container}>
                <h2>회원가입</h2>
                <form ref={formRef} className={styles.signup}>
                    <div className={styles.input}>
                        <div className={styles.emailDiv}>
                            <input ref={emailRef} className={styles.email} type="text" placeholder="이메일(example@gmail.com)"></input>
                        </div>
                        <div className={styles.pwDiv}>
                            <input ref={pwRef} className={styles.pw} type="password" placeholder="비밀번호"></input>
                        </div>
                        <div>
                            <input ref={pwCkRef} className={styles.pwCk} type="password" placeholder="비밀번호 확인"></input>
                        </div>
                    </div>
                    <div className={styles.noticeDiv}><span className={styles.notice}>{notice}</span></div>
                    <button className={styles.signUpBtn} onClick={onSignUp}>회원가입</button>
                </form>
                
            </div>
        </section>
    )};

export default Signup;