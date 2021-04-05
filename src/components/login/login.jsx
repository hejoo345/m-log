import React from 'react';
import styles from './login.module.css';
const Login = (props) => {
    return(
        <section className={styles.loginSection}>
            <div className={styles.container}>
                <h2>로그인</h2>
                <form className={styles.login}>
                    <input type="text" placeholder="이메일(example@gmail.com)"></input>
                    <input type="text" placeholder="비밀번호"></input>
                    <button>로그인</button>
                </form>
                <div>
                    <button>Google</button>
                    <button>카카오</button>
                </div>
                
            </div>
        </section>
    )};

export default Login;