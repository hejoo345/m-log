import React, { memo, useRef, useState } from 'react';
import styles from './navbar.module.css';
import {AiOutlineSearch} from 'react-icons/ai';
import {FaRegUserCircle} from 'react-icons/fa';
import { useDetectOutsideClick } from './useDetectOutsideClick';

const Navbar = memo(({onLogout,homeAndAddHandler}) => {

    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef,false);

    const userMenuHandler = () =>{
        setIsActive(!isActive);
    }
    const leftNavHandler = e =>{
        console.log(e.currentTarget.textContent);
    }
    return(
            <section className={styles.nav}>
                <ul className={styles.leftNav}>
                    <li className={styles.home} onClick={leftNavHandler}>홈</li>
                    <li className={styles.add} onClick={leftNavHandler}>추가하기</li>
                </ul>
                <div className={styles.rightNav}>
                    <div className={styles.search}>
                        <AiOutlineSearch/>
                        <input className={styles.searchInput} type='text' placeholder='검색'></input>
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