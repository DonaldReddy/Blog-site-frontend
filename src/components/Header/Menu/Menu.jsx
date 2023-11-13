import React, { useContext, useState } from 'react'
import styles from "./Menu.module.css"
import { NavLink } from 'react-router-dom'
import UserContext from "../../../context/UserContext.js"


function Menu() {

    const { UserAuth } = useContext(UserContext)
    const [hide, setHide] = useState(true);

    function logout() { }

    function handleMenu() {
        setHide(!hide);
    }

    return (
        <div id={styles['container']} >
            <img id={styles['menu-icon']} src='/menu.png' onClick={handleMenu} />

            <div id={styles['menu']} className={hide ? styles['menu-close'] : styles['menu-open']} >

                <ul id={styles['nav-ul']}>
                    <li>
                        <NavLink to="/" className={styles.none} onClick={handleMenu} >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        {UserAuth ?
                            <NavLink to="/user/myblogs" className={styles.none} >
                                My Blogs
                            </NavLink>
                            :
                            <NavLink to="/signin" className={styles.none} onClick={handleMenu}>
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
                            <NavLink to="/signup" className={styles.none} onClick={handleMenu}>
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

            </div>
        </div>
    )
}

export default Menu