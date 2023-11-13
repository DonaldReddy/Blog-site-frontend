import React from 'react'
import { NavLink } from "react-router-dom"
import styles from "./Home.module.css"

function Home() {

    return (
        <div className={styles['container']}>
            <div className={styles['main']}>
                <h1>
                    Spread your knowledge by Writing.
                </h1>
                <NavLink to="" ></NavLink>
            </div>
        </div>
    )
}

export default Home