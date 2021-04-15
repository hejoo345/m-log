import React, { memo, useRef, useState } from 'react';
import styles from './navbar.module.css';
import {AiOutlineSearch} from 'react-icons/ai';
import {FaRegUserCircle} from 'react-icons/fa';
import { useDetectOutsideClick } from './useDetectOutsideClick';

const Navbar = memo(({onLogout,homeAndAddHandler,homeActive,addActive,onSearchHandler}) => {

    const dropdownRef = useRef(null);
    const inputRef = useRef();
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef,false);


    const userMenuHandler = () =>{
        setIsActive(!isActive);
    }
    const leftNavHandler = e =>{
        if(e.target.textContent === '홈'){
            homeAndAddHandler('home');
        }else{
            homeAndAddHandler('add');
        }
    }
    const searchHandler=()=>{
        onSearchHandler(inputRef.current.value);
        inputRef.current.value = '';
    }
    const onKeyPress = e =>{
        if(e.key === 'Enter'){
            searchHandler();
        }
    }
    return(
            <section className={styles.nav}>
                <ul className={styles.leftNav} onClick={leftNavHandler}>
                    <li className={`${styles.home} ${homeActive? styles.active:''}`} >홈</li>
                    <li className={`${styles.add} ${addActive? styles.active:''}`} >기록하기</li>
                </ul>
                <div className={styles.rightNav}>
                    <div className={styles.search}>
                        <AiOutlineSearch/>
                        <input ref={inputRef} className={styles.searchInput}
                        type='text' placeholder='검색' onKeyPress={onKeyPress}></input>
                    </div>
                    <div className={styles.user} onClick={userMenuHandler} ref={dropdownRef}>
                        <FaRegUserCircle size="30"/>
                        <ul className={`${styles.userOption} ${isActive? styles.active:styles.inactive} `}>
                            <li onClick={onLogout}>로그아웃</li>
                        </ul>
                    </div>
                    
                </div>
            </section>
    )});

export default Navbar;