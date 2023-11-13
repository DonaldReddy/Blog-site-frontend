import React, { useEffect, useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from "./Header.module.css";
import UserContext from "../../context/UserContext.js"
import Menu from './Menu/Menu.jsx';

function Header() {

    const { setUser, UserAuth, setUserAuth } = useContext(UserContext);
    const navigate = useNavigate()
    const [width, setWidth] = useState(window.innerWidth)

    function logout() {
        setUserAuth(false);
        setUser({});
        localStorage.removeItem("user");
        alert("Signed Out!!!")
        navigate("/");
    }

    function handleResize() {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
    }, [])

    return (
        <nav className={styles['nav-bar']} >
            <div className={styles['nav-logo']}>
                <img src='' alt='Blogiac-logo' />
            </div>
            {(

                width <= 500 ? <Menu /> :
                    <ul id={styles['nav-ul']}>
                        <li>
                            <NavLink to="/" className={(isActive) => {
                                return styles.none + (isActive.isActive ? ' ' + styles.active : '')
                            }}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            {UserAuth ?
                                <NavLink to="/user/myblogs" className={(isActive) => {
                                    return styles.none + (isActive.isActive ? ' ' + styles.active : '')
                                }}>
                                    My Blogs
                                </NavLink>
                                :
                                <NavLink to="/signin" className={(isActive) => {
                                    return styles.none + (isActive.isActive ? ' ' + styles.active : '')
                                }}>
                                    SignIn
                                </NavLink>
                            }
                        </li>
                        <li>
                            {UserAuth ?
                                <NavLink to="/user/account" className={(isActive) => {
                                    return styles.none + (isActive.isActive ? ' ' + styles.active : '')
                                }}>
                                    My Account
                                </NavLink>
                                :
                                <NavLink to="/signup" className={(isActive) => {
                                    return styles.none + (isActive.isActive ? ' ' + styles.active : '')
                                }}>
                                    SignUp
                                </NavLink>
                            }
                        </li>
                        {UserAuth ?
                            <li>
                                <button type='button' className={styles['logout']} onClick={logout}  >Logout</button>
                                <div id={styles['logout']}></div>
                            </li>
                            : <></>
                        }
                    </ul>
            )}
        </nav>
    )
}

export default Header;
