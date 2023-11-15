import React from 'react'
import styles from './Loader.module.css'


function Loader() {
    return (
        <div id={styles['loader']}>
            <div className={styles['shape']} id={styles['fig1']}></div>
            <div className={styles['shape']} id={styles['fig2']}></div>
        </div>
    )
}

export default Loader