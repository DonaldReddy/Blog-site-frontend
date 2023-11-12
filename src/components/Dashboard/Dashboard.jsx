import React, { useContext } from 'react'
import UserContext from "../../context/UserContext.js"
import { useNavigate } from 'react-router-dom'
import styles from "./Dashboard.module.css"

function Dashboard() {

    const { UserAuth, User } = useContext(UserContext)
    const navigate = useNavigate()

    if (!UserAuth)
        navigate("/signin");



    return (
        <div id={styles['container']}>
            <div id={styles['main']}>
                <h1>My Information</h1>
                <div id={styles['info']}>

                    <label id={styles['name']}>
                        Name -
                        <input id={styles['inp1']} value={User.data.name} readOnly />
                    </label>

                    <label id={styles['email']}>
                        Email -
                        <input id={styles['inp2']} value={"test123@gmail.com"} readOnly />
                    </label>

                </div>
            </div>
        </div>
    )
}

export default Dashboard