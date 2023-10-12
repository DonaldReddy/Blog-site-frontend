import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from "./Header.module.css";
import UserContext from "../../context/UserContext.js"
import { useContext } from 'react';

function Header() {

    const { setUser, UserAuth, setUserAuth } = useContext(UserContext);
    const navigate = useNavigate()

    function logout() {
        setUserAuth(false);
        setUser({});
        localStorage.removeItem("user");
        alert("Signed Out!!!")
        navigate("/");
    }

    return (
        <nav className={styles['nav-bar']} >
            <div className={styles['nav-logo']}>
                <img src='' alt='logo' />
            </div>
            <ul id={styles['nav-ul']}>
                <li>
                    <NavLink to="/" className={styles.none}>
                        Home
                    </NavLink>
                </li>
                <li>
                    {UserAuth ?
                        <NavLink to="/user/myblogs" className={styles.none}>
                            My Blogs
                        </NavLink>
                        :
                        <NavLink to="/signin" className={styles.none}>
                            SignIn
                        </NavLink>
                    }
                </li>
                <li>
                    {UserAuth ?
                        <NavLink to="/user/account" className={styles.none}>
                            My Account
                        </NavLink>
                        :
                        <NavLink to="/signup" className={styles.none}>
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
        </nav>
    )
}

export default Header;
