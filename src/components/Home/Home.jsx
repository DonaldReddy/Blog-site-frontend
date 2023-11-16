import React, { useEffect } from 'react'
import { NavLink } from "react-router-dom"
import styles from "./Home.module.css"
import RandomBlogs from "../Blog/RandomBlogs/RandomBlogs.jsx"
function Home() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className={styles['container']}>
            <h1>
                Popular Blogs
            </h1>
            <div className={styles['main']}>
                <RandomBlogs />
            </div>
        </div>
    )
}

export default Home