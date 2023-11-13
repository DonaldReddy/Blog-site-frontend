import React from 'react'
import styles from "./Footer.module.css"
import { NavLink } from 'react-router-dom'
function Footer() {
    return (
        <>
            <footer id={styles['footer']}>
                <div id={styles['container']}>
                    <div className={styles['footer-logo']}> <img src='' alt='Blogiac-logo' /> </div>

                    <ul>
                        <li> <NavLink to='/' >Home</NavLink> </li>
                        <li> <NavLink to='/signin' >SignIn</NavLink> </li>
                        <li> <NavLink to='/signup' >SignUp</NavLink> </li>
                    </ul>
                    <ul>
                        <li> <NavLink to='/test' >Team</NavLink> </li>
                        <li> <NavLink to='/' >Support</NavLink> </li>
                        <li> <NavLink to='/' >Contact</NavLink> </li>
                    </ul>
                    <ul>
                        <li> <NavLink to='/' >Instagram</NavLink> </li>
                        <li> <NavLink to='/' >Linkedin</NavLink> </li>
                        <li> <NavLink to='/' >Twitter</NavLink> </li>
                    </ul>
                </div>
                <p>
                    © {new Date().getFullYear()}
                </p>
            </footer>
        </>
    )
}

export default Footer