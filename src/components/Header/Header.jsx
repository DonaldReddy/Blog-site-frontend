import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from "./Header.module.css";

function Header() {
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
                    <NavLink to="/signin" className={styles.none}>
                        SignIn
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/signup" className={styles.none}>
                        SignUp
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Header;
